import { Request, Response } from "express";

import LoginService from "../../../services/login";

class LoginController {
    async login(req: Request, res: Response) {
        try {
            const userCreated = await LoginService.login(req.body)
            res.json(userCreated.toJSON())
        } catch (erro) {
            res.status(400).json({
                message:
                    "Data values is bad! Users already exist or username is up in up4tech, Try other username!",
                error: erro,
            });
        }
    }
}

export default new LoginController()
