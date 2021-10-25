import fetch from "node-fetch";
import fs from "fs";
import request from "request";
// var fs = require("fs");
// var request = require("request");

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

const getCountryData = async () => {
  let url = "https://restcountries.com/v3.1/all";
  try {
    let response = await fetch(url);
    let json = await response.json();

    return json;
  } catch (err) {
    console.log(err);
  }
};

const downloadImages = async (array) => {
  // console.log(array.length);
  // console.log(array[0].flags.png);
  // console.log(array[0].cca2);
  // console.log(array[0].name.official);
  for (let i = 0; i < array.length; i++) {
    download(
      `${array[i].flags.png}`,
      `countryFlags/${array[i].cca2}.png`,
      function () {
        console.log(`Done: ${array[i].name.official}`);
      }
    );
  }
};

let countryData = await getCountryData();
downloadImages(countryData);

// download(
//   "https://www.google.com/images/srpr/logo3w.png",
//   "countryFlags/google.png",
//   function () {
//     console.log("done");
//   }
// );
