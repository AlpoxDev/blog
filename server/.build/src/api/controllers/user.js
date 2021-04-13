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
exports.UserController = void 0;
const typedi_1 = require("typedi");
const services_1 = require("../../services");
class UserController {
    static onGetUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset } = req;
            try {
                const userService = typedi_1.Container.get(services_1.UserService);
                const response = yield userService.onGetUsers({ limit, offset });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onGetUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            try {
                const userService = typedi_1.Container.get(services_1.UserService);
                const response = yield userService.onGetUser({ user, id });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onDeleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            try {
                const userService = typedi_1.Container.get(services_1.UserService);
                yield userService.onDeleteUser({ user, id });
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onUpdateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            const { profile, nickname } = req.body;
            try {
                const userService = typedi_1.Container.get(services_1.UserService);
                yield userService.onUpdateUser({ user, id, profile, nickname });
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onGetUserRequests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset } = req;
            try {
                const userService = typedi_1.Container.get(services_1.UserService);
                const response = yield userService.onGetUserRequests({ limit, offset });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onGetUserRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            try {
                const userService = typedi_1.Container.get(services_1.UserService);
                const response = yield userService.onGetUserRequest({ user, id });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onCreateUserRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { permission } = req.body;
            try {
                const userService = typedi_1.Container.get(services_1.UserService);
                const response = yield userService.onCreateUserRequest({
                    user,
                    permission,
                });
                res.status(201).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onDeleteUserRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            try {
                const userService = typedi_1.Container.get(services_1.UserService);
                yield userService.onDeleteUserRequest({ user, id });
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onUpdateUserRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            const { permission } = req.body;
            try {
                const userService = typedi_1.Container.get(services_1.UserService);
                yield userService.onUpdateUserRequest({ user, id, permission });
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
