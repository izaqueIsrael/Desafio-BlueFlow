import { Request, Response } from "express";
import { StatusCodes as Codes } from "http-status-codes";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export class RegisterController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { name, pass } = req.body;

    if (!name || !pass) {
      return res.status(Codes.BAD_REQUEST).json({ message: "Name or pass missing" });
    }

    const existingUser = await User.findOne({ username: name });
    if (existingUser) {
      return res.status(Codes.CONFLICT).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const user = new User({
      username: name,
      password: hashedPassword,
    });

    await user.save();

    return res.status(Codes.CREATED).json({ message: "Usuário registrado com sucesso" });
  }
}
