var express = require("express");
var router = express.Router();

const countriesData = require("../resources/data.json");
/* Returns all countries data */
router.get("/all", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(countriesData));
});

router.get("/name/:country", function (req, res, next) {
  let country = [];
  country.push(countriesData.find((x) => x.name === req.params.country));

  if (country[0] === undefined) {
    country = { error: "No country found." };
  }

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(country));
});

router.get("/alpha/:alpha", function (req, res, next) {
  let country;
  if (req.params.alpha.length === 3) {
    country = countriesData.find((x) => x.alpha3Code === req.params.alpha);
  } else {
    country = countriesData.find((x) => x.alpha2Code === req.params.alpha);
  }

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(country));
});

router.get("/continent/:region", function (req, res, next) {
  let country = countriesData.filter((x) => x.region === req.params.region);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(country));
});

module.exports = router;
