import express from "express";
import console from "console";

const app = express();

app.use(express.json());

// Services
import UsersService from "./src/services/users"

app.get("/", (req:express.Request, res:express.Response) => res.json({ ok: true }));


app.post("/users", async (req: express.Request, res: express.Response) => {
    res.json(await UsersService.create(req?.body))
})

app.listen(8080, () => console.log("Started braum service"));
