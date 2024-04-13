import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Database Connected..')
    
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect
