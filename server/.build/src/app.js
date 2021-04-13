"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// loaders
require("./env"); // env
const config_1 = __importDefault(require("./config"));
const express_2 = __importDefault(require("./loaders/express")); // express
const typedi_1 = __importDefault(require("./loaders/typedi")); // typedi
console.log(`Config Loading...`, config_1.default);
const app = express_1.default();
console.log(`Service Loading...`);
typedi_1.default();
console.log(`Express Loading...`);
express_2.default(app);
exports.default = app;
