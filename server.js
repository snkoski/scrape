
//Scrape a website and place the data in a MongoDB database.

var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");
var app = express();
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
    res.send("Hello world");
  });

// Route 1
// Retrieve all of the data from the scrapedData collection as a json.
// Populated by the data you scrape using the next route.
app.get("/all", function (req, res) {
    db.scrapedData.find({}, function(error, found) {
        // Log any errors if the server encounters one
        if (error) {
          console.log(error);
        }
        // Otherwise, send the result of this query to the browser
        else {
          res.json(found);
        }
      });
});

// Route 2
// Scrape data from the site of your choice, and save it to MongoDB.
app.get("/scrape", function (req, res) {
    axios.get("https://www.packtpub.com/").then(function (response) {

        // var results = [];
        // How do you push data into a MongoDB ?
        var $ = cheerio.load(response.data);

        //get img from website + src + alt
        $("img").each(function (i, element) {

            var imgLink = $(element).attr("src");
            var title = $(element).attr("alt");

            console.log(imgLink)
            console.log(title)

            // results.push({
            //     mgLink: imgLink, title: title
            // });

            db.scrapedData.insert({ imgLink: imgLink, title: title })
        });
    });
});

// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});
