import console from "console";
import { Request } from "express";
import { sequelize } from "../../../infra/database/models";
import users from "../../../infra/database/models/users";

import JwtService from "../../../services/jwt";

class LoginController {
  async validateTokenUser(req: Request) {
    try {
      return await JwtService.validateAccessToken(
        req.headers?.authorization || ""
      );
    } catch (error) {
      throw new Error("Jwt error validate Token");
    }
  }

  async veirfyTokenUser(req: Request) {
    try {
      return await JwtService.isAuthenticated(req);
    } catch (error) {
      throw new Error("Jwt error validate Token");
    }
  }

  async refresh(req: Request) {
    const { refresh_token } = req.body;

    const log = await JwtService.generateRefreshToken("wsbltx")
    console.log(log)
    try {
      const { sub } = await JwtService.validateRefreshToken(refresh_token);

      const findUser = await users(sequelize).findOne({
        where: { username: sub, refresh_token },
      });

      console.log(findUser)

      
      if (!findUser) {
        throw new Error(
          "User not valid! verify yout credentials or contact administrator"
        );
      }

      const tokens = {
        access_token: await JwtService.generateAccessToken(sub as string),
        refresh_token: await JwtService.generateRefreshToken(sub as string),
      };

      findUser.set({ refresh_token });
      findUser.save();

      return tokens
    } catch (erro) {
      throw new Error(erro as string);
    }
  }
}

export default new LoginController();
