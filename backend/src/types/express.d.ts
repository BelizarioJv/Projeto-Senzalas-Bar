import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: number; // Permite que o req tenha a propriedade userId opcionalmente
    }
  }
}
