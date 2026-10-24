import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connected - " + conn.connection.host);
    } catch (error) {
        const errorMessage = error?.message || "Unable to connect to the database";
        throw new Error(`Database connection failed: ${errorMessage}`);
    }
}