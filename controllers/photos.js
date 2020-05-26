'use strict';

const Photo = require('../models/Photo');

exports.photos = async (req, res) => {
  try {
    const photos = await Photo.byUser(res.locals.user);

    res.json({
      status: 'success',
      data: photos
    });  
  } catch (err) {
    console.log(err);

    res.json({
      status: 'error',
      message: 'Internal error'
    })
  }
};

exports.photoId = async (req, res) => {
  try {
    const photo = await Photo.byId(req.params.photoId);

    if (photo.get('user_id') === res.locals.user) {
      res.json({
        status: 'success',
        data: photo
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