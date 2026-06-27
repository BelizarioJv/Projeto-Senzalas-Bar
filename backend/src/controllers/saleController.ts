import { Handler } from "express";
import { prisma } from "../database/prisma";
import { HttpError } from "../errors/HttpError";
import {
  SaleRequestSchema,
  MetaSaleRequestSchema,
} from "./schemas/SaleRequestSchema";
import { Prisma } from "../generated/prisma/client";

export class SaleController {
  //Buscar todos as vendas
  index: Handler = async (req, res, next) => {
    try {
      const query = MetaSaleRequestSchema.parse(req.query);
      const { page, pageSize, total, sortBy, order } = query;
      const pageNumber = Number(page);
      const pageSizeNumber = Number(pageSize);

      const where: Prisma.SaleWhereInput = {};

      if (total) {
        where.total = {
          equals: total,
        };
      }

      const sales = await prisma.sale.findMany({
        where,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        orderBy: {
          [sortBy]: order,
        },
      });

      const totalRecords = await prisma.purchase.count({
        where,
      });

      res.json({
        data: sales,
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          totalRecords,
          totalPages: Math.ceil(totalRecords / pageSizeNumber),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  //Buscar venda
  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const saleId = Number(id);

      if (isNaN(saleId)) {
        return res.status(400).json({ message: "O ID fornecido é inválido." });
      }

      const sale = await prisma.sale.findUnique({
        where: { id: saleId },
        include: {
          user: {
            select: { id: true, name: true },
          },
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!sale) {
        return res.status(404).json({ message: "Venda não encontrada." });
      }

      res.status(201).json(sale);
    } catch (error) {
      next(error);
    }
  };

  //Criar venda
  create: Handler = async (req, res, next) => {
    try {
      const body = SaleRequestSchema.parse(req.body);

      // Validação estrita do usuário autenticado (JWT Middleware)
      if (!req.user || typeof req.user !== "number") {
        throw new HttpError(401, "Usuário não autenticado ou inválido");
      }

      const userId = req.user;

      const subtotal = body.products.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0,
      );

      const discountPercent = Number(body.discountPercent || 0);
      const discountValue = (subtotal * discountPercent) / 100;
      const total = subtotal - discountValue;

      // 1. Cria a venda com os dados recebidos
      const saleTransaction = await prisma.$transaction(async (tx) => {
        const sale = await tx.sale.create({
          data: {
            discountPercent,
            discountValue,
            total,
            payment: body.payment,
            observation: body.observation,
            userId: userId,
            products: {
              create: body.products.map((products) => ({
                productId: products.productId,
                quantity: products.quantity,
                price: products.price,
                subtotal: products.quantity * products.price,
              })),
            },
          },

          include: {
            products: true,
            user: true,
          },
        });

        // 2. verificando produto e a quantidade em estoque
        for (const products of body.products) {
          const product = await tx.product.findUnique({
            where: {
              id: products.productId,
            },
          });

          if (!product) {
            throw new Error(`Produto ${products.productId} não encontrado`);
          }

          if (product.currentQuantity < products.quantity) {
            throw new Error(
              `Estoque insuficiente para o produto ${product.name}`,
            );
          }

          // 3. Atualizando a quantidade dos produtos da venda
          await tx.product.update({
            where: {
              id: products.productId,
            },
            data: {
              currentQuantity: {
                decrement: products.quantity,
              },
            },
          });

          // 4. Criando movimentaçao de estoque
          await tx.stockMovement.create({
            data: {
              productId: products.productId,
              saleId: sale.id,
              movementType: "SAIDA",
              quantity: products.quantity,
              observations: `Sale #${sale.id}`,
            },
          });
        }

        return sale;
      });

      res.status(201).json(saleTransaction);
    } catch (error) {
      next(error);
    }
  };

  //Deletar venda
  delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedSale = await prisma.$transaction(async (tx) => {
        // 1. Buscar a venda e seus produtos
        const sale = await tx.sale.findUnique({
          where: { id: Number(id) },
          include: { products: true }, // relação com itens da venda
        });

        if (!sale) {
          throw new HttpError(404, "Sale not found");
        }

        // 2. Atualizar estoque dos produtos vendidos
        for (const item of sale.products) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              currentQuantity: {
                increment: item.quantity, // devolve ao estoque
              },
            },
          });
        }

        // 3. Deletar a venda
        const deleted = await tx.sale.delete({
          where: { id: Number(id) },
        });

        return deleted;
      });

      res.json(deletedSale);
    } catch (erro) {
      next(erro);
    }
  };
}
