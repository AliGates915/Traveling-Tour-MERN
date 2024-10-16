import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from './routes/auth.js'
import hotelRouter from './routes/hotel.js'
import roomRouter from './routes/room.js'
import userRouter from './routes/users.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();
dotenv.config();

// Middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/users', userRouter)

// app.use((err,next, req, res) => {
//   const errStatus = err.status || 500;
//   const errMessage = err.message || "Something went wrong"
//   return res.status(errStatus.json({
//     success: false,
//     status: errStatus,
//     message: errMessage,
//     stack: err.stack,
    
//   }))
//   next() 
// })

// Connect with MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connect to MongoDB");
    
  } catch (error) {
    console.log(error);
    throw error;
  }
};

mongoose.connection.on("disconnected", ()=> {
    console.log("MongoDB disconnected");
})


app.listen(8000, () => {
    connect()
  console.log("Connected to backend.");
});
