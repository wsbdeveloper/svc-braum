import { Express, Request, Response } from "express";
import { omit } from "lodash";

import LoginService from "../services/login";
import UsersService from "../services/users";

function routes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
      res.json({ ok: true });
    });

    app.post("/users", async (req: Request, res: Response) => {
        try {
            const userCreated = await UsersService.create(req?.body)
            res.json(omit(userCreated.toJSON(), "password"));
      } catch (erro) {
        res.status(400).json({
          message:
            "Data values is bad! Users already exist or username is up in up4tech, Try other username!",
          error: erro,
        });
      }
    });

    app.post("/login", (req: Request, res: Response) => {
      LoginService.login(req?.body).then((data) => {
        res.json(data);
      });
    });

    app.patch("/users", async (req: Request, res: Response) => {
      res.json(await UsersService.update(req?.body));
    });

    app.delete(
      "/users/:id",
      async (req: Request, res: Response) => {
        const id = req.params.id;
        res.json(
          await UsersService.delete({
            id,
          })
        );
      }
    );
}

export default routes;