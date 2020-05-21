const express = require("express");
const Twitter = require("twitter");
const app = express();
const dotenv = require("dotenv");
const cassandra = require("./connection");

dotenv.config({ path: "./config.env" });

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

function GetData(tweets){
  var tweetsArray = [];
  for(var i = 0; i < tweets.search_metadata.count; i++){
    var tweet = [];
    tweet[i+1] = {
      
      usuario: tweets.statuses[i].user.screen_name,
      seguidores: tweets.statuses[i].user.followers_count,
      hashtag: tweets.search_metadata.query,
      horario: tweets.statuses[i].created_at, 
      id:tweets.statuses[i].id,
      linguagem: tweets.statuses[i].lang,
      mensagem: tweets.statuses[i].text   

    };

    tweetsArray[i] = tweet[i+1];
 };
 return tweetsArray;
}
module.exports = 
function GetHashtag(query)
{
    var params = {
      q: '%23'+query,
      result_type: 'recent',
      include_entities: 'false',
      count: 100
    };
    console.log(params);

    client.get("search/tweets.json?", params, async function(error, tweets, res) {
      if (!error) {
        var data = await GetData(tweets);
        cassandra(data);
        
      } else {
        console.log(error);
      }
    });
  
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
