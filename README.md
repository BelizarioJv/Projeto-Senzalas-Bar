# 🍻 Senzalas Bar

Sistema de gestão para bares e pequenos comércios desenvolvido para atender às necessidades reais do bar da minha família. O projeto foi criado com o objetivo de aplicar conhecimentos de desenvolvimento Full Stack, modelagem de banco de dados, arquitetura de software e construção de aplicações escaláveis.

---

## 🚀 Visão Geral

O Senzalas Bar é uma aplicação de gerenciamento que permite controlar produtos, categorias, fornecedores, compras, vendas e movimentações de estoque de forma organizada e eficiente.

Além de resolver um problema real de negócio, o projeto serve como laboratório para aprofundamento em tecnologias modernas do ecossistema JavaScript e TypeScript.

---

## ✨ Funcionalidades

### 📦 Gestão de Produtos

- Cadastro de produtos
- Controle de preços de custo e venda
- Controle de estoque mínimo
- Ativação e inativação de produtos
- Organização por categorias

### 🏷️ Gestão de Categorias

- Cadastro de categorias
- Associação de produtos por categoria

### 🚚 Gestão de Fornecedores

- Cadastro de fornecedores
- Informações de contato
- Histórico de compras

### 🛒 Gestão de Compras

- Registro de compras
- Associação de fornecedor
- Registro de múltiplos produtos por compra
- Atualização automática do estoque
- Histórico completo de movimentações

### 💰 Gestão de Vendas

- Registro de vendas
- Controle de itens vendidos
- Aplicação de descontos
- Registro da forma de pagamento

### 📊 Dashboard

- Total de produtos cadastrados
- Produtos com estoque baixo
- Total de vendas do dia
- Total de vendas do mês

### 📈 Controle de Estoque

- Movimentações de entrada
- Movimentações de saída
- Ajustes de estoque
- Histórico completo das alterações

---

## 🧠 Tecnologias Utilizadas

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- REST API

### Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- Axios
- TanStack Query
- React Hook Form

### Banco de Dados

- PostgreSQL

---

## 🏗️ Arquitetura

O backend segue uma arquitetura organizada por responsabilidades:

```text
src/
├── controllers/
├── database/
├── errors/
├── middlewares/
├── routes/
├── schemas/
├── services/
└── utils/
```

### Principais conceitos aplicados

- Programação Orientada a Objetos (POO)
- Arquitetura em Camadas
- Validação de Dados
- Tratamento Centralizado de Erros
- Transações com Prisma
- Relacionamentos entre entidades
- Boas práticas REST

---

## 🗄️ Modelagem do Sistema

Principais entidades:

- Product
- Category
- Supplier
- Purchase
- PurchaseProduct
- Sale
- SaleItem
- StockMovement

Relacionamentos modelados utilizando Prisma ORM e PostgreSQL.

---

## 🎯 Objetivos do Projeto

- Aplicar conceitos de desenvolvimento Full Stack
- Consolidar conhecimentos em TypeScript
- Praticar modelagem de banco de dados relacional
- Construir APIs REST profissionais
- Desenvolver interfaces modernas com React e Next.js
- Criar uma solução utilizável em um cenário real

---

## 📈 Próximas Implementações

### 🔐 Autenticação e Controle de Acesso

- Login de usuários
- Perfis e permissões

### 🪑 Gestão de Mesas

- Controle de mesas
- Pedidos vinculados às mesas

### 👥 Gestão de Clientes

- Cadastro de clientes
- Histórico de compras

### 📊 Relatórios Avançados

- Produtos mais vendidos
- Faturamento por período
- Compras por fornecedor
- Evolução do estoque

### 📉 Dashboard Avançado

- Gráficos de vendas
- Indicadores financeiros
- Métricas operacionais

### 📱 Responsividade

- Interface otimizada para tablets
- Interface otimizada para dispositivos móveis

---

## 💡 Aprendizados

Este projeto representa um marco importante na minha jornada como desenvolvedor, pois reúne conceitos de backend, frontend, banco de dados e regras de negócio em uma aplicação desenvolvida para resolver problemas reais.

Ao longo do desenvolvimento estou aprofundando conhecimentos em arquitetura de software, APIs REST, ORM, banco de dados relacionais, validação de dados, integração frontend/backend e construção de sistemas escaláveis.

---

### 👨‍💻 Desenvolvido por

João Victor Belizário
