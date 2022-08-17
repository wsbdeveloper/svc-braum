import { Request } from "express";

export function getTokenFromHeaders(req: Request) {
  const authHeader =
    req.headers["x-authorization"] as string || req.headers["authorization"] as string || "";
  const token = authHeader?.split(" ")[authHeader?.split(" ").length - 1];
  return token;
}
