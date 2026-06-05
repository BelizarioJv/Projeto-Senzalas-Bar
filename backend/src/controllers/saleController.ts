import { Handler } from "express";
import { prisma } from "../database/prisma";
import { PurchaseRequestSchema } from "./schemas/PurchaseResquestSchema";
import { SaleRequestSchema } from "./schemas/SaleRequestSchema";

export class SaleController {
  index: Handler = async (req, res, next) => {
    try {
      const sales = await prisma.sale.findMany();
      res.json(sales);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const purchase = await prisma.sale.findUnique({
        where: { id: Number(id) },
        include: {
          total: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = SaleRequestSchema.parse(req.body);

      const subtotal = body.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      );

      const discount = Number(body.discount || 0);

      const total = subtotal - discount;

      const saleTransaction = await prisma.$transaction(async (tx) => {
        const sale = await tx.sale.create({
          data: {
            discount,
            total,
            payment: body.payment,
            observation: body.observation,

            items: {
              create: body.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.quantity * item.price,
              })),
            },
          },

          include: {
            items: true,
          },
        });

        for (const item of body.items) {
          const product = await tx.product.findUnique({
            where: {
              id: item.productId,
            },
          });

          if (!product) {
            throw new Error(`Produto ${item.productId} não encontrado`);
          }

          if (product.currentQuantity < item.quantity) {
            throw new Error(
              `Estoque insuficiente para o produto ${product.name}`,
            );
          }

          await tx.product.update({
            where: {
              id: item.productId,
            },
            data: {
              currentQuantity: {
                decrement: item.quantity,
              },
            },
          });

          await tx.stockMovement.create({
            data: {
              productId: item.productId,
              movementType: "EXIT",
              quantity: item.quantity,
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

  delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const purchase = await prisma.sale.findUnique({
        where: { id: Number(id) },
      });

      const deletedSale = await prisma.sale.delete({
        where: { id: Number(id) },
      });

      res.json(deletedSale);
    } catch (erro) {
      next(erro);
    }
  };
}
