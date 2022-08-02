import express from "express";
import jwt from "jsonwebtoken";
import process from "process";
import { getTokenFromHeaders } from "./helpers/jwt";

const ACCESSTOKEN_SECRET = process.env?.ACCESSTOKEN_SECRET as string;
const ACCESSTOKEN_EXPIRATION = "3s";
const REFRESHTOKEN_SECRET = process.env?.REFRESHTOKEN_SECRET as string;
const REFRESHTOKEN_EXPIRATION = "10s";

export const authService = {
  async generateAccessToken(userId: string) {
    return jwt.sign({ roles: ["user"] }, "ACCESSTOKEN_SECRET", {
      subject: userId,
      expiresIn: "1d",
    });
  },
  async validateAccessToken(accessToken: string) {
    return jwt.verify(accessToken, ACCESSTOKEN_SECRET);
  },
  async isAuthenticated(req: express.Request) {
    const token = getTokenFromHeaders(req);

    try {
      await authService.validateAccessToken(token);
      return true;
    } catch (err) {
      return false;
    }
  },
  async generateRefreshToken(userId: string) {
    return jwt.sign({}, REFRESHTOKEN_SECRET, {
      subject: userId,
      expiresIn: REFRESHTOKEN_EXPIRATION,
    });
  },
  async validateRefreshToken(refreshToken: string) {
    return jwt.verify(refreshToken, REFRESHTOKEN_SECRET);
  },
  async decodeToken(token: string) {
    return jwt.decode(token);
  },
};
