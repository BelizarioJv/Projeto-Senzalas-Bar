//Servidor

import { prisma } from "./database/prisma"; // Ajuste o caminho se necessário
import { loginRouter } from "./routes/login";
import { productRouter } from "./routes/productRoutes";
import { supplierRouter } from "./routes/supplierRoutes";
import { purchaseRouter } from "./routes/purchaseRoutes";
import { saleRouter } from "./routes/saleRoutes";
import { dashboardRouter } from "./routes/dashboard";
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorHandler } from "./middlewares/errorMiddleware";

// ---------------------------------
import express from "express";
import cors from "cors";

//Inicalizaçao do server
const app = express();

//Configuraçao do server
app.use(express.json());
app.use(cors());

// ---------------------------------
app.use("/login", loginRouter);
app.use("/products", authMiddleware, productRouter);
app.use("/supplier", authMiddleware, supplierRouter);
app.use("/purchase", authMiddleware, purchaseRouter);
app.use("/sale", authMiddleware, saleRouter);
app.use("/dashboard", authMiddleware, dashboardRouter);

// Middleware de erro
app.use(errorHandler);

// ---------------------------------
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
