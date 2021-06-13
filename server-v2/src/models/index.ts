export * from "./_models";

import { Sequelize } from "sequelize-typescript";

import config from "../config";
import * as modelAttributes from "./_models";

const sequelize = new Sequelize({
  ...config.SEQUELIZE,
  models: Object.values(modelAttributes)
    .map((value: any) => typeof value === "function" && value)
    .filter(Boolean),
});

export default sequelize;
