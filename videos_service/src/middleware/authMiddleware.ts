import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes as Codes } from "http-status-codes";
import { env } from "../config/env";

interface JwtPayload {
  userId: string;
  email?: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(Codes.UNAUTHORIZED).json({ error: "Token não fornecido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    (req as any).user = decoded;

    next();
  } catch (err) {
    console.error("Erro na verificação do token:", err);
    res.status(Codes.UNAUTHORIZED).json({ error: "Token inválido ou expirado" });
  }
};
