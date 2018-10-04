const express = require('express')
const router = express.Router()

const artPieces = require(__dirname+"/data/art")

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

  data.results = [];

  for (let piece of artPieces.pieces) {
    for (let pieceRgb of piece.rgb) {
      if (data.searchRgb === pieceRgb) {
        data.results.push(piece);
        continue;
      }
    }
  }

  res.render('index', data);
})

module.exports = router;
