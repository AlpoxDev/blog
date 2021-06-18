import jsonwebtoken, { Jwt, JwtPayload } from "jsonwebtoken";
import config from "../config";

export const signToken = (
  value: object,
  expiresIn?: string
): string | undefined => {
  if (!expiresIn) expiresIn = "1d";
  return jsonwebtoken.sign(value, config.JWT_KEY, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jsonwebtoken.verify(token, config.JWT_KEY);
};
