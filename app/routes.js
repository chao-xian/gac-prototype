const express = require('express')
const router = express.Router()

const colours = require(__dirname+'/data/colours');
const artPieces = require(__dirname+'/data/art');

// Add your routes here - above the module.exports line

router.get("/", function(req, res) {
  let data = {};
  const encodedHashMatch = /^\%23/;
  const hashMatch = /\#/;
  let rgbVal = '';


  // Make page have a bunch of links for each swatch
  // Link sends off param with the rgb hex value
  // When it gets here, we search the data for items that have that colour
  // and then sort


  if (req.query.rgb !== undefined) {
    rgbVal = req.query.rgb.replace(encodedHashMatch, '').replace(hashMatch, '');
  }

  data.searchRgb = rgbVal;

  data.results = [];

  if (req.query.colour !== undefined) {
    artPieces.sort(function(a, b) {
      return b[req.query.colour] - a[req.query.colour];
    });

    for (let piece of artPieces) {
      console.log(`HI ${piece[req.query.colour]}`);
      data.results.push(piece);
    }
  }


  res.render('index', data);
})

module.exports = router;
