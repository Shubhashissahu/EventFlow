import mongoose, { Mongoose } from "mongoose";

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Pull from global using the new type declarations
const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseConnection;
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Mongoose> {
  // If connection already exists, use it
  if (globalWithMongoose.mongoose.conn) {
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("❌ Missing MONGODB_URI environment variable.");
    }

    globalWithMongoose.mongoose.promise = mongoose
      .connect(MONGODB_URI, { dbName: "eventflow" })
      .then((mongooseInstance) => mongooseInstance);
  }

  globalWithMongoose.mongoose.conn =
    await globalWithMongoose.mongoose.promise;

  return globalWithMongoose.mongoose.conn;
}
