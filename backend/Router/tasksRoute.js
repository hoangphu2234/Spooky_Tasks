import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./../Controllers/tasksController.js";

const taskRoute = express.Router();

taskRoute.get("/", getAllTasks);

taskRoute.post("/", createTask);

taskRoute.patch("/:id", updateTask);

taskRoute.delete("/:id", deleteTask);

export default taskRoute;
