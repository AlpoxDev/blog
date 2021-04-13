"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionAuthorizer = exports.IfAuthorizer = exports.Authorizer = exports.getVerified = exports.getAccessToken = exports.extractAccessToken = void 0;
const common_1 = require("../../common");
const models_1 = require("../../models");
const BEARER_TOKEN_PATTERN = /^Bearer[ ]+([^ ]+)[ ]*$/i;
const extractAccessToken = (authorization) => {
    if (!authorization)
        return null;
    const result = BEARER_TOKEN_PATTERN.exec(authorization);
    if (!result)
        return null;
    return result[1];
};
exports.extractAccessToken = extractAccessToken;
const getAccessToken = (req) => {
    const authorizationHeader = req.headers['Authorization'] || req.headers['authorization'];
    return exports.extractAccessToken(authorizationHeader);
};
exports.getAccessToken = getAccessToken;
const getVerified = (req) => {
    const accessToken = exports.getAccessToken(req);
    if (!accessToken)
        throw { status: 400, message: 'NotFound accessToken' };
    const verified = common_1.verifyToken(accessToken);
    return verified;
};
exports.getVerified = getVerified;
const Authorizer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verified = exports.getVerified(req);
        if (!verified)
            throw { status: 401, message: 'Invalid Bearer Token' };
        const user = yield models_1.User.findByPk(verified.id, {
            attributes: ['id', 'permission'],
        });
        if (user) {
            req.user = user;
            next();
        }
        else {
            throw { status: 401, message: 'NotFound user in Authorizer' };
        }
    }
    catch (error) {
        next(error);
    }
});
exports.Authorizer = Authorizer;
const IfAuthorizer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = exports.getAccessToken(req);
    if (accessToken) {
        const verified = common_1.verifyToken(accessToken);
        if (!verified)
            throw { status: 401, message: 'Invalid Bearer Token' };
        try {
            const user = yield models_1.User.findByPk(verified.id, {
                attributes: ['id', 'permission'],
            });
            if (user)
                req.user = user;
            else
                throw { status: 404, message: 'NotFound user in Authorizer' };
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next();
    }
});
exports.IfAuthorizer = IfAuthorizer;
const PermissionAuthorizer = (permission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const verifed = exports.getVerified(req);
            if (!verifed)
                throw {
                    status: 400,
                    message: `Authorization Failure: Permission Authorizer`,
                };
            const user = yield models_1.User.findOne({
                where: { id: verifed.id },
                attributes: ['id', 'permission'],
            });
            if (!user)
                throw { status: 404, message: 'NotFound user in Authorizer' };
            if (user.permission === permission ||
                user.permission == models_1.UserPermission.admin) {
                req.user = user;
                next();
            }
            else {
                throw { status: 401, message: `Invalid Permission: ${permission}` };
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.PermissionAuthorizer = PermissionAuthorizer;
