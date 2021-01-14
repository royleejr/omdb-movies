const express = require("express");
const router = express.Router();
const axios = require("axios");
const { reset } = require("nodemon");

router.get("/:title", (req, res) => {
  axios
    .get(
      `http://www.omdbapi.com/?i=tt3896198&apikey=c457f6e5&s=${req.params.title}&type=movie`
    )
    .then((response) => {
      res.send(response.data.Search);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
