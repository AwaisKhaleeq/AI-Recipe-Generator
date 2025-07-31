// lib/mongo.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;

declare global {
  // Allow global variables in Node.js
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

const clientPromise: Promise<MongoClient> = global._mongoClientPromise!;

export const connectDB = async () => {
  const client = await clientPromise;
  return client.db('recipe-app');
};
