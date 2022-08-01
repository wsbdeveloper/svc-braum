import express from "express";
import console from "console";
import dotenv from "dotenv";

const app = express();
dotenv.config()

app.use(express.json());

// Services

import UsersService from "./src/services/users"
import LoginService from "./src/services/login"

app.get("/", (req:express.Request, res:express.Response) => res.json({ ok: true }));

app.post("/users", async (req: express.Request, res: express.Response) => {
    try {
        res.json(await UsersService.create(req?.body));
    } catch (erro) { 
        res.status(400).json({
            message: "Erro for created user!"
        })
    }
})

app.post("/login",async (req: express.Request, res:express.Response) => {
    res.json(await LoginService.login(req?.body))
})

app.patch("/users", async (req: express.Request, res: express.Response) => { 
    res.json(await UsersService.update(req?.body))
})


app.listen(8080, () => console.log("Started braum service"));

export default app