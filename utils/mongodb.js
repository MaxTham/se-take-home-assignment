import { MongoClient } from "mongodb";
import {resetOrdersAndBots} from "./reset";
const uri = process.env.MONGODB_URI
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so it's not recreated on hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client each time
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Call the reset logic at startup
clientPromise.then(() => {
  resetOrdersAndBots();
});
export default clientPromise;
