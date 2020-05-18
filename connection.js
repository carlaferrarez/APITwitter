const cassandra = require('cassandra-driver');
const { Client, auth } = require('cassandra-driver');


const client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'] ,
                                     localDataCenter: 'datacenter1', 
                                     keyspace: 'twitter',
                                     authProvider: new auth.PlainTextAuthProvider('admin', 'admin')});

// client.on('log', function(level, className, message, furtherInfo) {
//   console.log('log event: %s -- %s', level, message);
// });

client.connect();
client.execute('select * from twitter.stweet', function(err, result) {

  if (err) throw Error();
  console.log(result.rows[0]);
});
