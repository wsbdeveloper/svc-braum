import { Request, Response } from "express";

import LoginService from "../../../services/login";

class LoginController {
    async login(req: Request, res: Response) {
        try {
            const loginUser = await LoginService.login(req.body)
            res.json(loginUser);
        } catch (erro) {
            res.status(400).json({
                message:
                    "Login not successfully!",
                error: erro,
            });
        }
    }
}

export default new LoginController()
