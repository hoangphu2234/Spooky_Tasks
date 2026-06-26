import express from "express";
import taskRoute from "../Router/tasksRoute.js";
import dotenv from "dotenv";
import { connectDB } from "../config/connectDB.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
// app.use(cors()); Cho phép tất cả domains gọi APIs
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/task", taskRoute);

connectDB().then(() => {
  app.listen("3000", () => {
    console.log("Server started ...");
  });
});
