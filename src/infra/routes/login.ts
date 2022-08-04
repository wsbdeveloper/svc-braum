import Express, { Request, Response } from "express";

import LoginController from "../../application/web/controller/login";
const router = Express.Router();

router.post("/", (req: Request, res: Response) => {
  LoginController.login(req, res)
});

export default router;
