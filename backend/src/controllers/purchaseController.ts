import { Handler } from "express";
import { prisma } from "../database/prisma";
import { Prisma } from "../generated/prisma";
import { HttpError } from "../errors/HttpError";
import {
  PurchaseRequestSchema,
  MetaPurchaseRequestSchema,
} from "./schemas/PurchaseResquestSchema";

export class PurchaseController {
  //Buscar compras com paginaçao e filtros
  index: Handler = async (req, res, next) => {
    try {
      const query = MetaPurchaseRequestSchema.parse(req.query);

      const { page, pageSize, total, sortBy, order } = query;

      const pageNumber = Number(page);
      const pageSizeNumber = Number(pageSize);

      const where: Prisma.PurchaseWhereInput = {};

      if (total) {
        where.total = {
          equals: total,
        };
      }

      const purchases = await prisma.purchase.findMany({
        where,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        orderBy: {
          [sortBy]: order,
        },
        include: { user: true },
      });

      const totalRecords = await prisma.purchase.count({
        where,
      });

      res.json({
        data: purchases,
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

  //Mostrar dados da compra
  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const purchase = await prisma.purchase.findUnique({
        where: { id: Number(id) },
        include: {
          supplier: true,
          products: {
            include: {
              product: true,
              usuario: {
                select: { id: true, name: true },
              },
            },
          },
        },
      });

      res.json(purchase);
    } catch (error) {
      next(error);
    }
  };

  // Criação de compra
  create: Handler = async (req, res, next) => {
    try {
      const body = PurchaseRequestSchema.parse(req.body);

      const total = body.products.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0,
      );
      // Garantir que req.user existe e não é string
      if (!req.user || typeof req.user === "string") {
        throw new HttpError(401, "Usuário não autenticado");
      }

      if (!req.user || typeof req.user === "string") {
        throw new HttpError(401, "Usuário não autenticado");
      }

      const purchaseTransaction = await prisma.$transaction(async (tx) => {
        const purchase = await tx.purchase.create({
          data: {
            supplierId: body.supplierId,
            payment: body.payment,
            total: new Prisma.Decimal(total),
            products: {
              create: body.products.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                subtotal: new Prisma.Decimal(item.price).times(item.quantity),
              })),
            },
          },
          include: {
            products: true,
            user: true,
          },
        });

        // Atualiza estoque e cria movimentação
        for (const product of body.products) {
          await tx.product.update({
            where: { id: product.productId },
            data: {
              costPrice: product.price,
              currentQuantity: { increment: product.quantity },
            },
          });

          await tx.stockMovement.create({
            data: {
              productId: product.productId,
              purchaseId: purchase.id,
              movementType: "ENTRADA",
              quantity: product.quantity,
              observations: `Purchase #${purchase.id}`,
            },
          });
        }

        return purchase;
      });

      res.status(201).json(purchaseTransaction);
    } catch (error) {
      next(error);
    }
  };

  //Deletar compra
  delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedPurchase = await prisma.$transaction(async (tx) => {
        // 1. Buscar a compra e seus itens
        const purchase = await tx.purchase.findUnique({
          where: { id: Number(id) },
          include: { products: true }, // supondo que tenha relação "products"
        });

        if (!purchase) {
          throw new HttpError(404, "Purchase not found");
        }

        // 2. Atualizar estoque dos produtos (remover a quantidade que entrou)
        for (const item of purchase.products) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              currentQuantity: { decrement: item.quantity },
            },
          });
        }

        // 3. Deletar a compra
        const deleted = await tx.purchase.delete({
          where: { id: Number(id) },
        });

        return deleted;
      });

      res.json(deletedPurchase);
    } catch (erro) {
      next(erro);
    }
  };
}
