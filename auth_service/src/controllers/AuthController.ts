import { Request, Response } from "express";

export class AuthController {
  private actions: Record<string, (req: Request, res: Response) => Response> = {
    login: this.login,
    register: this.register,
  };

  public handle = (req: Request, res: Response): Response => {
    const { action } = req.params;
    const handler = this.actions[action];

    if (!handler) {
      return res.status(404).json({ message: "Inválido cara" });
    }

    return handler(req, res);
  };

  private login(req: Request, res: Response): Response {
    return res.status(200).json({ message: "Oh, ainda vai ser feito" });
  }

  private register(req: Request, res: Response): Response {
    return res.status(201).json({ message: "Trabalhando aqui cara calma" });
  }
}
