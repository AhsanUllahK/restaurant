import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log("connected to database. ", conn.connection.host);
  } catch (error) {
    console.log("Error in mongodb connection. ", error.message);
  }
};
