import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function DbConnection() {
  const uri = `mongodb+srv://shakil:${process.env.password}@cluster0.0dsfltg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(uri);

    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
