import express from "express";
import taskRoute from "../Router/tasksRoute.js";
import dotenv from "dotenv";
import { connectDB } from "../config/connectDB.js";
import cors from "cors";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

const app = express();

// Middlewares
app.use(express.json());
// app.use(cors()); Cho phép tất cả domains gọi APIs
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/task", taskRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(process.env.PORT || "3000", () => {
    console.log("Server started ...");
  });
});
