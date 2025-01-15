import mongoose from "mongoose";

export const connectDB = async (dbName: string) => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI, {
        dbName,
      });
      console.log(`Connected to MongoDB ${dbName} database.`);
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error(`Failed to connect to MongoDB ${dbName} database: `);
    }
  }
};
