export * from "./_models";

import { Sequelize, ModelCtor } from "sequelize-typescript";

import config from "../config";
import * as studioModelAttributes from "./studio/index";

export const studioModels = Object.values(studioModelAttributes)
  .map((value) => typeof value === "function" && value)
  .filter(Boolean) as ModelCtor[];

export const studioSequelize = new Sequelize({
  ...config.SEQUELIZE,
  models: studioModels,
});

export const blogSequelize = undefined;
