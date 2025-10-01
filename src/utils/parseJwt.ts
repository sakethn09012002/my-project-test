import { JWT } from "next-auth/jwt";

export function parseJwt(token: string): Record<string, unknown> {
  try {
    return JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    ) as Record<string, unknown>;
  } catch {
    return {};
  }
}

