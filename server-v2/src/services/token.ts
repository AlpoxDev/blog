import jsonwebtoken, { Jwt, JwtPayload } from "jsonwebtoken";
import config from "../config";

export const signToken = <T extends object>(
  value: T,
  expiresIn?: string
): string | undefined => {
  try {
    if (!expiresIn) expiresIn = "1d";
    return jsonwebtoken.sign(value, config.JWT_KEY, { expiresIn });
  } catch (error) {
    return undefined;
  }
};

export const verifyToken = <T extends object>(token: string) => {
  try {
    return jsonwebtoken.verify(token, config.JWT_KEY) as T;
  } catch (error) {
    return undefined;
  }
};
