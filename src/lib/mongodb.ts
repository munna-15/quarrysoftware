import mongoose from "mongoose";
import dns from "node:dns";

const MONGODB_URI = process.env.MONGODB_URI;

dns.setServers(["8.8.8.8", "1.1.1.1"]);

type MongoCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongoCache | undefined;
}

const cache: MongoCache = (globalThis.mongooseCache ??= {
  conn: null,
  promise: null,
});

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Add it to your .env.local file.");
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI).catch((error) => {
      cache.promise = null;
      throw error;
    });
  }

  cache.conn = await cache.promise;

  return cache.conn;
}
