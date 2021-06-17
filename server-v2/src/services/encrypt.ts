import { AES, enc } from "crypto-js";
import config from "../config";

export const encryptAES256 = (value: string): string => {
  return AES.encrypt(value, config.AES256_KEY).toString();
};

export const decryptAES256 = (value: string): string => {
  const bytes = AES.decrypt(value, config.AES256_KEY);
  return JSON.parse(bytes.toString(enc.Utf8));
};
