const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require('../models/Url');
// Create new short url

router.post('/shortenUrl', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  const { longUrl,expiryDate,user,password } = req.body;
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  // Create short url code 
  const shortUrlId = shortid.generate();

  // Check if long url is valid
  if(!longUrl) {
    res.status(400).json({error:{errorMessage:'Empty long url! Long Url is required.'}});
  } else if (validUrl.isUri(longUrl)) {
    try {
      // Check if there is already a short url created for the url
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + shortUrlId;

        url = new Url({
          longUrl,
          shortUrl,
          shortUrlId,
          expiryDate,
          user,
          password
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({error:{errorMessage:'Internal Error! Something went wrong.'}});
    }
  } else {
    res.status(400).json({error:{errorMessage:'Invalid long url'}});
  }
});


// get all short url

router.get('/allUrl', async (req,res)=> {
  let urls = await Url.find({});
  res.status(200).json({urls})
})



module.exports = router;