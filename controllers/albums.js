'use strict';

const Album = require('../models/Album');

exports.albums = async (req, res) => {
  try {
    const albums = await Album.byUser(res.locals.user);

    res.json({
      status: 'success',
      data: albums
    });  
  } catch (err) {
    console.log(err);

    res.json({
      status: 'error',
      message: 'Internal error'
    })
  }
};

exports.albumId = async (req, res) => {
  try {
    const album = await Album.byId(req.params.albumId);

    if (album.get('user_id') === res.locals.user) {
      res.json({
        status: 'success',
        data: album
      });  

    } else {
      res.json({
        status: 'fail',
        data: 'Access denied'
      });  
    }

  } catch (err) {
    console.log(err);
    
    res.json({
      status: 'error',
      message: 'Internal error'
    })
  }
};