import { JWT } from "next-auth/jwt";

export function parseJwt(token: string) {
  try {
    return JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    ) as JWT;
  } catch {
    return {};
  }
}

