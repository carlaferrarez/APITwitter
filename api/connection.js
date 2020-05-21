const cassandra = require('cassandra-driver');
const { Client, auth } = require('cassandra-driver');


const client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'] ,
                                     localDataCenter: 'datacenter1', 
                                     keyspace: 'twitter',
                                     authProvider: new auth.PlainTextAuthProvider('admin', 'admin')});

const query = 'INSERT INTO twitter.stweet (usuario, seguidores, hashtag, horario, id, linguagem, mensagem) VALUES (?, ?, ?, ?, ?, ?, ?)';
const queryRemove = 'TRUNCATE twitter.stweet;'

client.connect();

module.exports = 
  function populateData(tweetsArray){
    client.execute(queryRemove);
    
    for(var i = 0; i < tweetsArray.length; i++){
      client.execute(query, [tweetsArray[i].usuario,
      tweetsArray[i].seguidores,
      tweetsArray[i].hashtag,
      tweetsArray[i].horario,
      tweetsArray[i].id,
      tweetsArray[i].linguagem,
      tweetsArray[i].mensagem],{ prepare : true });

    };
    console.log("deu certo");
  };