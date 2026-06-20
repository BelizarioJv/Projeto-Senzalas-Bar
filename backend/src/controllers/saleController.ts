import { Handler } from "express";
import { prisma } from "../database/prisma";
import { HttpError } from "../errors/HttpError";
import { SaleRequestSchema } from "./schemas/SaleRequestSchema";

export class SaleController {
  //Buscar todos os produtos
  index: Handler = async (req, res, next) => {
    try {
      const sales = await prisma.sale.findMany();
      res.json(sales);
    } catch (error) {
      next(error);
    }
  };

  //Buscar produto
  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const purchase = await prisma.sale.findUnique({
        where: { id: Number(id) },
        include: {
          total: true,
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      res.status(201).json(purchase);
    } catch (error) {
      next(error);
    }
  };

  //Criar produto
  create: Handler = async (req, res, next) => {
    try {
      const body = SaleRequestSchema.parse(req.body);

      const subtotal = body.products.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0,
      );

      const discount = Number(body.discount || 0);

      const total = subtotal - discount;

      // 1. Cria a venda com os dados recebidos
      const saleTransaction = await prisma.$transaction(async (tx) => {
        const sale = await tx.sale.create({
          data: {
            discount,
            total,
            payment: body.payment,
            observation: body.observation,

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
