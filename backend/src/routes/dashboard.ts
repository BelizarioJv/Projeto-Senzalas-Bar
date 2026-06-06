import express from "express";
import { DashboardController } from "../controllers/dashboardController";

export const dashboardRouter = express.Router();

const dashboardController = new DashboardController();

dashboardRouter.get("/", dashboardController.index);
