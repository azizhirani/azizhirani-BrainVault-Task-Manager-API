import dotenv from "dotenv";
import 'express-async-errors';
import mongoose from 'mongoose';
import { errorHandler } from "#middlewares/error.middlewares";
import dbConnect from './db/index.js';
import app from "./app.js";


dotenv.config();

const PORT = process.env.PORT || 8080;

dbConnect();

// Error handling middleware should have a response sent or passed to next error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB`);
  // serve listening only after the mongoDB is connected
  app.listen(PORT, () => console.log(`Server started on ${PORT}`));
});

mongoose.connection.on('error', err => {
  console.error(err);
  // log the error
});
