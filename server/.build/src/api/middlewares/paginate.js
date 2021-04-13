"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginate = void 0;
const config_1 = __importDefault(require("../../config"));
const Paginate = (req, res, next) => {
    const { limit: queryLimit, page: queryPage, offset: queryOffset } = req.query;
    if (queryPage && queryOffset) {
        return next({
            status: 400,
            message: 'BadRequest: page and offset duplicated',
        });
    }
    let limit = 20;
    if (typeof queryLimit === 'string')
        limit = parseInt(queryLimit, 10) || 20;
    if (limit > config_1.default.MAX_LIMIT)
        limit = config_1.default.MAX_LIMIT;
    let offset = 0;
    if (typeof queryPage === 'string') {
        const page = parseInt(queryPage, 10);
        if (page && page > 1) {
            offset = (page - 1) * limit;
        }
    }
    else if (typeof queryOffset === 'string') {
        offset = parseInt(queryOffset, 10) || 0;
    }
    req.offset = offset;
    req.limit = limit;
    next();
};
exports.Paginate = Paginate;
