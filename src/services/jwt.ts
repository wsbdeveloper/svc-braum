import express from "express";
import jwt from "jsonwebtoken";
import process from "process";
import { getTokenFromHeaders } from "./helpers/jwt";

class AuthService {
  async generateAccessToken(userId: string) {
    return jwt.sign(
      { roles: ["user"] },
      process.env?.ACCESSTOKEN_SECRET as string,
      {
        subject: userId,
        expiresIn: "1d",
      }
    );
  }

  async validateAccessToken(accessToken: string) {
    return jwt.verify(accessToken, process.env?.ACCESSTOKEN_SECRET as string);
  }

  async isAuthenticated(req: express.Request) {
    const token = getTokenFromHeaders(req);

    try {
      await this.validateAccessToken(token);
      return true;
    } catch (err) {
      return false;
    }
  }

  async generateRefreshToken(userId: string) {
    return jwt.sign({}, "secret" as string, {
      subject: userId,
      expiresIn: "24h",
    });
  }
  async validateRefreshToken(refreshToken: string) {
    return jwt.verify(refreshToken, "secret" as string);
  }

  async decodeToken(token: string) {
    return jwt.decode(token);
  }

  async refresh(refresh_token: string) {
    return await this.validateRefreshToken(refresh_token);
  }
}

export default new AuthService();
