import Express, { Request, Response } from "express";

const router = Express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json({
        up: "ok"
    })
});


export default router;