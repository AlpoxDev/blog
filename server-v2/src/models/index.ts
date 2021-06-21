export * from "./_models";

import { Sequelize, ModelCtor } from "sequelize-typescript";

import config from "../config";
import * as studioModelAttributes from "./studio/index";
import * as percentModelAttributes from "./101%/index";

const studioModels = Object.values(studioModelAttributes)
  .map((value) => typeof value === "function" && value)
  .filter(Boolean) as ModelCtor[];

const percentModels = Object.values(percentModelAttributes)
  .map((value) => typeof value === "function" && value)
  .filter(Boolean) as ModelCtor[];

export const studioSequelize = new Sequelize({
  ...config.STUDIO.SEQUELIZE,
  models: studioModels,
});

export const percentSequelize = new Sequelize({
  ...config.PERCENT.SEQUELIZE,
  models: percentModels,
});

export const blogSequelize = undefined;
