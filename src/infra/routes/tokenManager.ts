import Express, { Request, Response } from "express";

import tokenController from "../../application/web/controller/token";
const router = Express.Router();

router.post("/create/access", (req: Request, res: Response) => {
  tokenController
    .createAccessToken(req)
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: 400,
        message: "Check your credentials and try again!",
        exception: err,
      });
    });
});


router.post("/create/refresh", (req: Request, res: Response) => {
  tokenController
    .createRefreshToken(req)
    .then((data) => {
      res.json({
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: 400,
        message: "Check your credentials and try again!",
        exception: err,
      });
    });
});

export default router;