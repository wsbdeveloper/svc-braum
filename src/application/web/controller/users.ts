import { Request, Response } from "express";
import { omit } from "lodash";

import UserService from "../../../services/users";

class UserController {
  async create(req: Request, res: Response) {
    try {
      console.log(req.body)
      const userCreated = await UserService.create(req?.body);
      res.json(omit(userCreated.toJSON(), ["password", "refresh_token"] ));
    } catch (erro) {
      res.status(400).json({
        message:
          "Data values is bad! Users already exist or username is up in up4tech, Try other username!",
        error: erro,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      req.body.id = id
      res.json(await UserService.update(req?.body));
    } catch (error) {
      res.status(400).json({});
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    res.json(
      await UserService.delete({
        id,
      })
    ); 
  }
}

export default new UserController();
