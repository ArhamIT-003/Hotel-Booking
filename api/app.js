import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import roomRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnnted", () => {
  console.log("MongoDB Disconnected!");
});

// middleware ///
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
// Exit Middleware //
app.listen(8800, () => {
  connect();
  console.log("Server running on port 8800");
});
