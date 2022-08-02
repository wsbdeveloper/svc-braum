type Headers = {
    headers: any
}

export function getTokenFromHeaders(req: Headers) {
  const authHeader =
    req.headers["x-authorization"] || req.headers["authorization"];
  const token = authHeader?.split(" ")[authHeader?.split(" ").length - 1];
  return token;
}
