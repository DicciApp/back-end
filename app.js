import express from "express";
import cors from "cors";
import dbConnect from "./config/database.js";
import dotenv from "dotenv";
import { userRouter, favoritesRouter } from "./router/index.js";


const PORT = process.env.PORT || 3000;
dotenv.config();

// connect to database
dbConnect()

// init express app
const app = express();

// set up middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
});

// set up routes
app.use('/users', userRouter);
app.use('/favorites', favoritesRouter);

// Set up database connection and server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});