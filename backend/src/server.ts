import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import reportRoutes from './routes/report';
dotenv.config();
const app = express();

app.use(cors({
  origin:[
    "https://report-beige.vercel.app/",
    "https://localhost:5173"
  ],
  methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
  allowedHeaders:["Content-type","Authorization"],
  credentials: true
}));
app.options("*",cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log(err));