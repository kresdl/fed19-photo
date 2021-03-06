'use strict';

const Album = require('../models/Album'),
  User = require('../models/User');

module.exports = {
  
  async albums(_, res) {
    try {
      const albums = await User.albums(res.locals.user);

      if (albums.length) {
        res.success(200, albums);
      } else {
        res.fail(404, 'No albums found');
      }

    } catch (err) {
      console.log(err);
      res.error();
    }
  },

  async album(req, res) {
    try {
      const album = await User.album(res.locals.user, +req.params.albumId);

      if (album) {
        res.success(200, album);

      } else {
        res.fail(404, 'Album not found');
      }

    } catch (err) {
      console.log(err);
      res.error();
    }
  },

  async newAlbum(req, res) {
    try {
      const album = await Album.create(res.locals.user, req.body.title);
      res.success(200, album);

    } catch (err) {

      if (err.code === 'ER_DUP_ENTRY') {
        res.fail(409, 'Album already exists');

      } else {
        console.log(err);
        res.error();
      }
    }
  },

  async deleteAlbum(req, res) {
    try {
      const ok = await Album.destroy(res.locals.user, +req.params.albumId);

      if (ok) {
        res.success(200, 'Album deleted');
      } else {
        res.fail(404, 'Album not found');
      }

    } catch (err) {
      console.log(err);
      res.error();
    }
  },

  async addPhoto(req, res) {
    try {
      const album = await Album.addPhoto(res.locals.user,
        +req.params.albumId, +req.params.photoId);

      if (album) {
        res.success(200, 'Photo added');
      } else {
        res.fail(404, 'Album not found');
      }

    } catch (err) {

      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        res.fail(404, 'Photo not found');

      } else if (err.code === 'ER_DUP_ENTRY') {
        res.fail(409, 'Album already contains photo');

      } else {
        console.log(err);
        res.error();
      }
    }
  },

  async addMany(req, res) {
    const photos = req.body;

    try {
      const album = await Album.addPhoto(res.locals.user, 
        +req.params.albumId, photos);

      if (album) {
        res.success(200, 'Photos added');
      } else {
        res.fail(404, 'Album not found');
      }

    } catch (err) {

      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        res.fail(404, 'A photo is not found');

      } else if (err.code === 'ER_DUP_ENTRY') {
        res.fail(409, 'Album already contains a photo');

      } else {
        console.log(err);
        res.error();
      }
    }
  },

  async removePhoto(req, res) {
    try {
      const album = await Album.removePhoto(res.locals.user,
        +req.params.albumId, +req.params.photoId);

      if (album) {
        res.success(200, 'Photo removed');
      } else {
        res.fail(404, 'Album not found');
      }

    } catch (err) {
      if (err.message === 'ENOENT') {
        res.fail(404, 'Photo not found');

      } else {
        console.log(err);
        res.error();
      }
    }
  }
};