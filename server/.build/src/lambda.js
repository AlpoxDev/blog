"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const app_1 = __importDefault(require("./app"));
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
exports.handler = serverless_express_1.default({ app: app_1.default });
