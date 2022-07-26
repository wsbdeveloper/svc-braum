import express from "express";
import console from "console";

const app = express();

app.get("/", (req, res) => res.json({ ok: true }));

app.listen(8080, () => console.log("Hello2 API  de login"));
