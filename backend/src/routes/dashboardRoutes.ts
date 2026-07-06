import express from "express";
import { DashboardController } from "../controllers/dashboardController";

export const dashboardRouter = express.Router();

const dashboardController = new DashboardController();

//rota para busca dados do dashboard
dashboardRouter.get("/", dashboardController.index);

//rota para buscar dados de movimentaçoes de estoque
dashboardRouter.get("/stock-movement", dashboardController.stockMovement);
