const mongoUri = process.env.URI_MONGO_DB;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = mongoUri;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db;

async function mongoConnect() {
  try {
    const database = client.db('sporty-user-db');
    db = database;
    return database;
  } catch(error){
    console.log(error);
  }
}

function getDb(){
  return db;
}

module.exports = {mongoConnect, getDb};