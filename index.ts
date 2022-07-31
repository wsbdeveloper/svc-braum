import express from "express";
import console from "console";
import dotenv from "dotenv";

const app = express();
dotenv.config()

app.use(express.json());
console.log(process.env)

// Services
import UsersService from "./src/services/users"

app.get("/", (req:express.Request, res:express.Response) => res.json({ ok: true }));

app.post("/users", async (req: express.Request, res: express.Response) => {
    res.json(await UsersService.create(req?.body))
})
app.patch("/users", async (req: express.Request, res: express.Response) => { 
    await UsersService.update(req?.body)
})

app.listen(8080, () => console.log("Started braum service"));
