const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

function authentication(req, res, next,url) {
  let authheader = req.headers.authorization;

  if(authheader) {
     const auth = new Buffer.from(authheader && authheader.split(' ')[1],
    'base64').toString().split(':');
     const user = auth[0];
     const pass = auth[1];
     if (user === url.user && pass === url.password) {
        // If Authorized user
        res.redirect(url.longUrl)
        next();
    } else {
      res.set({
        'WWW-Authenticate': 'Basic realm="auth"'
      }).sendStatus(401);
    }
  } else {
    res.set({
      'WWW-Authenticate': 'Basic realm="auth"'
    }).sendStatus(401);
  }
}

// redirect short url to long url 
router.get('/:shortUrlId', async (req,res,next)=> {
  const url = await Url.findOne({shortUrlId: req.params.shortUrlId});
  if(url) {
    const isUrlExpired = new Date(url.expiryDate) - new Date();
    if(isUrlExpired<=0) {
      res.status(400).json({error:{errorMessage:'url is Expired'}});
    } else if(url.password && url.user){
      authentication(req,res,next,url);
    }else {
      res.redirect(url.longUrl)
    } 
  } else {
    res.status(404).json({error:{errorMessage:'Page Not Found'}});
  }
})

module.exports = router;