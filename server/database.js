import mongoose from 'mongoose';
import { MONGODB_URL } from './config';

// Mongoose conection

mongoose
  .connect(MONGODB_URL)
  .then((db) => console.log('DB is connected'))
  .catch((error) => console.error(error));
