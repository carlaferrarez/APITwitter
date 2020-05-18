const express = require("express");
const Twitter = require("twitter");
const app = express();
const dotenv = require("dotenv");
const cassandra = require("./connection");

dotenv.config({ path: "./config.env" });

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

app.get("/tweets", function(req, res) {
  var params = {
    q: "%23nasa",
    count: 100
  };

  client.get("search/tweets.json?", params, function(error, tweets, res) {
    if (!error) {
      console.log(tweets);
    } else {
      console.log(error);
    }
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
