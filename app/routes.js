const express = require('express')
const router = express.Router()

const artPieces = require(__dirname+"/data/art")

// Add your routes here - above the module.exports line

router.get("/", function(req, res){

  let data = {}
  data.searchRgb = req.query.rgb

  data.results = []

  for (let piece of artPieces.pieces){
    for (let pieceRgb of piece.rgb){
      if (data.searchRgb === pieceRgb){
        data.results.push(piece)
        continue
      }
    }
  }

  res.render('index', data)

})

module.exports = router
