import console from "console";
import Express, { Request, Response } from "express";

import JwtController from "../../application/web/controller/jwt";
const router = Express.Router();

router.post("/refresh", (req: Request, res: Response) => {
  JwtController.refresh(req).then(data => { 
    console.log(data)
    res.json({
      data
    })
  }).catch((err) => { 
    console.log(err)
    res.status(400).json({
      error: 400,
      message: "Check your credentials and try again!",
    });
  })
});

export default router;