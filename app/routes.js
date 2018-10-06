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
      return parseFloat(b[req.query.colour]) - parseFloat(a[req.query.colour]);
    });

    for (let piece of artPieces) {
      console.log(`HI ${piece[req.query.colour]}`);
      data.results.push(piece);
    }
  }

  // res.set({
  //   'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  //   'Pragma': 'no - cache',
  //   'Expires': '0',
  //   'Surrogate-Control': 'no-store',
  // });
  res.render('index', data);
})

module.exports = router;
