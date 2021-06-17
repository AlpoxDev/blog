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

export const sequelizeConfig: SequelizeOptions = {
  host: parseENV("DB_HOST") as string,
  port: (parseENV("DB_PORT", "number") as number) || 3306, // (env.DB_PORT || 3306) as number,
  database: parseENV("DB_DATABASE") as string,
  dialect: (parseENV("DB_DIALECT") as Dialect) || "mariadb",
  username: parseENV("DB_USERNAME") as string,
  password: parseENV("DB_PASSWORD") as string,
  timezone: "+09:00",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    timestamps: true,
  },
};

const config = {
  NODE_ENV,
  PORT: (parseENV("PORT", "number") as number) || 8080,
  TELEGRAM_KEY: parseENV("TELEGRAM_KEY") as string,
  SEQUELIZE: sequelizeConfig,
  PASSWORD_KEY: parseENV("PASSWORD_KEY") as string,
  AES256_KEY: parseENV("AES256_KEY") as string,
};

export default config;
