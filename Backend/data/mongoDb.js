import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.mongo_url;

const dbName = process.env.mongo_name;

var dbConn;

async function getCollection(collectionName) {
  const db = await _connect();
  return db.collection(collectionName);
}

async function _connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    console.log("Cannot Connect to DB", err);
    throw err;
  }
}

export { getCollection };
