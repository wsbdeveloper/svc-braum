import { Request } from "express";

import JwtService from "../../../services/jwt";

class TokenController {
  async createAccessToken(req: Request) {
    try {
      return await JwtService.generateAccessToken(req.body.username);
    } catch (error) {
      throw "Erro generate access token";
    }
  }

  async createRefreshToken(req: Request) {
    try {
      return await JwtService.generateAccessToken(req.body.username);
    } catch (error) {
      throw "Erro generate refresh token";
    }
  }
}

export default new TokenController();
