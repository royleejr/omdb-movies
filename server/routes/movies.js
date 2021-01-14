const express = require("express");
const router = express.Router();
const fs = require("fs");

const nominationsData = require("../data/nominationsData.json");

router.post("/", (req, res) => {
  //add more validation when data set is more set in stone
  if (!req.body) {
    res.send("Please add item to post");
  } else {
    const newNominationsData = [...nominationsData, req.body];
    fs.writeFileSync(
      "./data/nominationsData.json",
      JSON.stringify(newNominationsData, null, 2)
    );
    res.send("Post Successful").status(200);
  }
});

router.put("/", (req, res) => {
  if (!req.body) {
    res.send("Please add movie ID to delete");
  } else {
    const newNominationsData = nominationsData.filter((item) => {
      return item.id !== req.body.id;
    });
    if (newNominationsData.length === nominationsData.length) {
      res.send("ID did not match any from the nominations list");
    } else {
      fs.writeFileSync(
        "./data/nominationsData.json",
        JSON.stringify(newNominationsData, null, 2)
      );
      res.send("Post Successful").status(200);
    }
  }
});

module.exports = router;
