import Express, { Request, Response } from "express";

const router = Express.Router();

router.post("/", (req: Request, res: Response) => {
    res.json({
        up: "ok"
    })
});


export default router;