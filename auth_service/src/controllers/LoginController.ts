import { StatusCodes as Codes } from "http-status-codes";
import { Request, Response } from "express";
import { User } from "../models/User";
import { env } from "../config/env";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export class LoginController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { name, pass } = req.body;

    if (!name || !pass) {
      return res.status(Codes.BAD_REQUEST).json({ message: "Name or pass missing" });
    }

    const user = await User.findOne({ username: name });
    if (!user) {
      return res.status(Codes.UNAUTHORIZED).json({ message: "Credenciais inválidas" });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return res.status(Codes.UNAUTHORIZED).json({ message: "Credenciais inválidas" });
    }

    try {

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        env.JWT_SECRET
      );
      
      return res.status(Codes.OK).json({ message: "Login realizado com sucesso", token });

    } catch (err) {
      console.error("[AUTH_API] Error generating access token:", err);
      return res.status(Codes.INTERNAL_SERVER_ERROR).json({ message: "Ocorreu um erro interno." });
    }
  }
}
