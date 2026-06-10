//Servidor
import { productRouter } from "./routes/productRoutes";
import { categoryRouter } from "./routes/categoryRoutes";
import { supplierRouter } from "./routes/supplierRoutes";
import { purchaseRouter } from "./routes/purchaseRoutes";
import { saleRouter } from "./routes/saleRoutes";
import { dashboardRouter } from "./routes/dashboard";

import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/supplier", supplierRouter);
app.use("/purchase", purchaseRouter);
app.use("/sale", saleRouter);
app.use("/dashboard", dashboardRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
