//Servidor

import express from "express";
import cors from "cors";
import { productRouter } from "./src/routes/productRoutes.js";

const app = express();

app.use(express.json());

//Estudando sobre CORS(pendente)
app.use(cors());

app.use("/products", productRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
