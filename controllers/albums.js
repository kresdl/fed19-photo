'use strict';

const Album = require('../models/Album');

exports.albums = async (req, res) => {
  try {
    const albums = await Album.byUser(res.locals.user);

    if (albums.length) {
      res.success(200, albums);
    } else {
      res.fail(404, 'No albums found');
    }

  } catch (err) {
    console.log(err);
    res.error();
  }
};

exports.album = async (req, res) => {
  try {
    const album = await Album.byId(res.locals.user, req.params.albumId);

    if (album) {
      res.success(200, album);
    } else {
      res.fail(404, 'Album not found');
    }

  } catch (err) {
    console.log(err);
    res.error();
  }
};

exports.newAlbum = async (req, res) => {
  const { title } = req.body;

  try {
    await Album.create(res.locals.user, title);
    res.success(200, 'Album created');

  } catch (err) {
    console.log(err);

    if (err.code === 'ER_DUP_ENTRY') {
      res.fail(409, 'Album already exists');
    } else {
      res.error();
    }
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const ok = await Album.destroy(res.locals.user, req.params.albumId);

    if (ok) {
      res.success(200, 'Album deleted');
    } else {
      res.fail(404, 'Album not found');
    }
  
  } catch (err) {
    console.log(err);
    res.error();
  }
}