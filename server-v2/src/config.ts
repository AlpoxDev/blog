import dotenv from "dotenv";
import type { Dialect } from "sequelize";
import type { SequelizeOptions } from "sequelize-typescript";

const NODE_ENV = process.env.NODE_ENV || "prod";
dotenv.config({ path: __dirname + `/../env/.env.${NODE_ENV}` });

function parseENV(key: string, type?: "string" | "number" | "boolean") {
  const value = process.env[key];
  if (!value) return undefined;

  try {
    if (!type || type === "string") {
      return value;
    } else if (type === "number" && parseInt(value, 10)) {
      return parseInt(value, 10);
    } else if (type === "boolean" && (value === "true" || value === "false")) {
      return value === "true";
    }
  } catch (error) {
    console.log(`parseENV error!`);
    return undefined;
  }
}

export const studioSequelizeConfig: SequelizeOptions = {
  host: parseENV("STUDIO_DB_HOST") as string,
  port: (parseENV("STUDIO_DB_PORT", "number") as number) || 3306, // (env.DB_PORT || 3306) as number,
  database: parseENV("STUDIO_DB_DATABASE") as string,
  dialect: (parseENV("STUDIO_DB_DIALECT") as Dialect) || "mariadb",
  username: parseENV("STUDIO_DB_USERNAME") as string,
  password: parseENV("STUDIO_DB_PASSWORD") as string,
  timezone: "+09:00",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timestamps: true,
  },
};

export const studioConfig = {
  SEQUELIZE: studioSequelizeConfig,
  KAKAO_KEY: parseENV("STUDIO_KAKAO_KEY") as string,
  JWT_KEY: parseENV("STUDIO_JWT_KEY") as string,
  TELEGRAM_KEY: parseENV("STUDIO_TELEGRAM_KEY") as string,
};

export const percentSequelizeConfig: SequelizeOptions = {
  host: parseENV("PERCENT_DB_HOST") as string,
  port: (parseENV("PERCENT_DB_PORT", "number") as number) || 3306, // (env.DB_PORT || 3306) as number,
  database: parseENV("PERCENT_DB_DATABASE") as string,
  dialect: (parseENV("PERCENT_DB_DIALECT") as Dialect) || "mariadb",
  username: parseENV("PERCENT_DB_USERNAME") as string,
  password: parseENV("PERCENT_DB_PASSWORD") as string,
  timezone: "+09:00",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timestamps: true,
  },
};

export const percentConfig = {
  SEQUELIZE: percentSequelizeConfig,
  KAKAO_KEY: parseENV("PERCENT_KAKAO_KEY") as string,
  JWT_KEY: parseENV("PERCENT_JWT_KEY") as string,
};

const config = {
  NODE_ENV,
  PORT: (parseENV("PORT", "number") as number) || 8080,
  COOKIE_KEY: parseENV("COOKIE_KEY") as string,
  AES256_KEY: parseENV("AES256_KEY") as string,

  STUDIO: studioConfig,
  PERCENT: percentConfig,
};

export default config;
