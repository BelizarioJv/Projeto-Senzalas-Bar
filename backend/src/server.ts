//Servidor
import { productRouter } from "./routes/productRoutes";
import { supplierRouter } from "./routes/supplierRoutes";
import { purchaseRouter } from "./routes/purchaseRoutes";
import { saleRouter } from "./routes/saleRoutes";
import { dashboardRouter } from "./routes/dashboard";
import { errorHandler } from "./middlewares/errorMiddleware";
import express from "express";
import cors from "cors";

//Inicalizaçao do server
const app = express();

//Configuraçao do server
app.use(express.json());
app.use(cors());

//Rotas da aplicaçao

app.use("/products", productRouter);
app.use("/supplier", supplierRouter);
app.use("/purchase", purchaseRouter);
app.use("/sale", saleRouter);
app.use("/dashboard", dashboardRouter);

// Middleware de erro
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
