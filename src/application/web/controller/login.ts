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
                error: 'Contact the support the API.',
            });
        }
    }
}

export default new LoginController()
