import { Handler } from "express";
import { prisma } from "../database/prisma";
import { getStartOfToday, getStartOfMonth } from "../utils/date";

export class DashboardController {
  index: Handler = async (req, res, next) => {
    try {
      const totalProducts = await prisma.product.count({
        where: {
          status: "ACTIVE",
        },
      });

      const products = await prisma.product.findMany({
        select: {
          currentQuantity: true,
          minimumQuantity: true,
        },
      });

      const lowStockProducts = products.filter(
        (product) => product.currentQuantity <= product.minimumQuantity,
      ).length;

      const todaySales = await prisma.sale.aggregate({
        _sum: {
          total: true,
        },
        where: {
          dateTime: {
            gte: getStartOfToday(),
          },
        },
      });

      const monthSales = await prisma.sale.aggregate({
        _sum: {
          total: true,
        },
        where: {
          dateTime: {
            gte: getStartOfMonth(),
          },
        },
      });

      res.json({
        totalProducts,
        lowStockProducts,
        todaySales: Number(todaySales._sum.total ?? 0),
        monthSales: Number(monthSales._sum.total ?? 0),
      });
    } catch (error) {
      next(error);
    }
  };
}
