'use strict';

const Photo = require('../models/Photo'),
  Album = require('../models/Album');

exports.photos = async (req, res) => {
  try {
    const photos = await Photo.byUser(res.locals.user);

    if (photos.length) {
      res.success(200, photos);
    } else {
      res.fail(404, 'No photos found');
    }

  } catch (err) {
    console.log(err);
    res.error();
  }
};

exports.photo = async (req, res) => {
  try {
    const photo = await Photo.byId(res.locals.user, req.params.photoId);

    if (photo) {
      res.success(200, photo);
    } else {
      res.fail(404, 'Photo not found');
    }

    
  } catch (err) {
    console.log(err);
    res.error();
  }
};

exports.newPhoto = async (req, res) => {
  try {
    const { title, url, comment, albums: albumNames } = req.body,
      { user } = res.locals,
      albums = await Album.byNames(user, albumNames);

    await Photo.create({ 
      userId: user,
      title, url, comment, albums
    });

    res.success();  

  } catch (err) {
    console.log(err);

    if (err.code === 'ER_DUP_ENTRY') {
      res.fail(409, 'Photo already exists');
    } else {
      res.error();
    }
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const ok = await Photo.destroy(res.locals.user, req.params.photoId);

    if (ok) {
      res.success(200, 'Photo deleted');
    } else {
      res.fail(404, 'Photo not found');
    }
  
  } catch (err) {
    console.log(err);
    res.error();
  }
}