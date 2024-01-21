import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()


const PORT = 5000;
const mongo_user = process.env.mongo_user;
const mongo_passwd = encodeURIComponent(process.env.mongo_passwd);
const mongo_db = process.env.mongo_db;
const mongoURI = `mongodb://${mongo_user}:${mongo_passwd}@localhost:27017/${mongo_db}`;

const app = express()
app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI);

import userRoutes from './routes/users.js';
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Web server listening on http://localhost:${PORT}`);
})
