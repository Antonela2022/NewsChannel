// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_ATLAS_URI;
const options = {};

if (!uri) throw new Error("Please define the NEXT_ATLAS_URI environment variable.");

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const getDb = async () => {
  const client = await clientPromise;
  return client.db("CloudComputing"); // 👈 AICI setezi baza de date dorită
};

export default clientPromise;
