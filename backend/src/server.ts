//Servidor

import express from "express";
import cors from "cors";
import { productRouter } from "./routes/productRoutes";
import { categoryRouter } from "./routes/categoryRoutes";
import { supplierRouter } from "./routes/supplierRoutes";

const app = express();

app.use(express.json());

//Estudando sobre CORS(pendente)
app.use(cors());

app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/supplier", supplierRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
