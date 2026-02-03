const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;

// Permite JSON no body das requisições
app.use(express.json());
// Configura CORS
app.use(cors());

// Rotas
const routesServices = require("./src/routes/routesServices");
app.use("/products", routesServices);

// Rota básica
app.get("/", (req, res) => {
  res.send("Servidor Express está rodando!");
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
