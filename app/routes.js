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

  if (req.query.rgb !== undefined) {
    rgbVal = req.query.rgb.replace(encodedHashMatch, '').replace(hashMatch, '');
  }

  data.searchRgb = rgbVal;
  data.colour = req.query.colour;
  data.results = [];

  if (req.query.colour !== undefined) {
    artPieces.sort(function(a, b) {
      return parseFloat(b[req.query.colour]) - parseFloat(a[req.query.colour]);
    });

    for (let piece of artPieces) {
      console.log(`${data.colour} percentage: ${piece[data.colour]}`);
      data.results.push(piece);
    }
  }

  res.render('index', data);
});

module.exports = router;
