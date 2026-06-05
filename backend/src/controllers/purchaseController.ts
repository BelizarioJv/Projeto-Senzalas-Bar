import { Handler } from "express";
import { prisma } from "../database/prisma";
import { PurchaseRequestSchema } from "./schemas/PurchaseResquestSchema";

export class PurchaseController {
  index: Handler = async (req, res, next) => {
    try {
      const purchases = await prisma.purchase.findMany({
        include: {
          supplier: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });
      res.json(purchases);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const purchase = await prisma.purchase.findUnique({
        where: { id: Number(id) },
        include: {
          supplier: true,
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
      const body = PurchaseRequestSchema.parse(req.body);

      const total = body.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      );

      const purchaseTrnsaction = await prisma.$transaction(async (tx) => {
        const purchase = await tx.purchase.create({
          data: {
            supplierId: body.supplierId,
            payment: body.payment,
            total,

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
          await tx.product.update({
            where: {
              id: item.productId,
            },
            data: {
              currentQuantity: {
                increment: item.quantity,
              },
            },
          });

          await tx.stockMovement.create({
            data: {
              productId: item.productId,
              movementType: "ENTRY",
              quantity: item.quantity,
              observations: `Purchase #${purchase.id}`,
            },
          });
        }

        return purchase;
      });

      res.status(201).json(purchaseTrnsaction);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const purchase = await prisma.purchase.findUnique({
        where: { id: Number(id) },
      });

      const deletedPurchase = await prisma.purchase.delete({
        where: { id: Number(id) },
      });

      res.json(deletedPurchase);
    } catch (erro) {
      next(erro);
    }
  };
}
