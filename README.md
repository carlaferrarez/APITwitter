
# Tweetbot

The objective of this project was to create a chatbot on the Telegram platform that searches and analyzes tweets from a requested #tag.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to get some things ready before we start. They would be:

```
Access the Twitter API and request access keys: https://developer.twitter.com/
```
```
Install Cassandra. You will need to add a superuser and keep it running with the application
```
```
Install Spark and keep it running with the application
```
```
Call bot @tweetcafecastroBot in Telegram
```

### Installing

#### Cassandra Configuration
In your terminal, type the following (in my case the username and password are 'admin')

```
cqlsh -u admin -p admin
```
After that, we will create the keyspace and the table

```
Create keyspace Twitter with replication={'class':'SimpleStrategy','replication_factor': 3};
```
```
CREATE TABLE stweet(id bigint, hashtag text, usuario text,seguidores int,horario timestamp, mensagem text, linguagem text, PRIMARY KEY(usuario, seguidores)) WITH CLUSTERING ORDER BY (seguidores desc);
```
You can do a SELECT to see if the table is created properly

```
USE twitter;
```
```
SELECT * FROM stweet;
```
#### Spark Configuration

Now we need to set Spark configurations and connect with our database
* Don't forget to keep the terminal with Cassandra database running

In our spark path folder:
* You can change the package to yours

```
spark-shell --packages datastax:spark-cassandra-connector:2.0.0-M2-s_2.11 --conf sparkdra.connection.host=127.0.0.1
```
After that you will be connected to Spark. Now we need to run the configs to set cassandra's database:

```
sc.stop
```
```
import com.datastax.spark.connector._, org.apache.spark.SparkContext, org.apache.spark.SparkContext._, org.apache.spark.SparkConf 
``` 

In the case below, don't forget to add your credentials

```
val conf = new SparkConf(true).set("spark.cassandra.connection.host", "localhost").set("spark.cassandra.auth.username", "admin").set("spark.cassandra.auth.password", "admin")
```
```
val sc = new SparkContext(conf)

```
Change the step below too if you created different keyspace and table

```
val test_spark_rdd = sc.cassandraTable("twitter", "stweet")

```
If everything runs fine, this command will show you the first row of your database

```
test_spark_rdd.first
```
We can also get the total of posts with a specific language, for example portuguese

```
test_spark_rdd.where("linguagem= ?", "pt").count() 
```

With all that settled up, now we just need to run the application. I used Visual Studio Code

## How to use Telegram bot

With the application running, start a conversation with bot @tweetcafecastroBot

```

```
## Future plans

#### Spark
Integrate Spark with the API

#### Bot
Develop more and simply the steps for the user. Bring also more information

## Built With

* [NodeJs](https://nodejs.org/en/) - The web framework used
* [Telegraf](https://github.com/telegraf/telegraf) - Telegram bot framework for NodeJs
* [Cassandra](https://cassandra.apache.org/) - Database management
* [Spark](https://spark.apache.org/) - Data processing

## Authors

* **Carla Castro** 

