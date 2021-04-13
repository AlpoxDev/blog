"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.UserService = void 0;
const typedi_1 = require("typedi");
const models_1 = require("../models");
let UserService = class UserService {
    constructor() { }
    onGetUsers({ limit, offset }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: users, count } = yield models_1.User.findAndCountAll({
                    limit,
                    offset,
                });
                return { users, count };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onGetUser({ user, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (user.id !== id && user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근 권한이 없습니다.' };
                const findUser = yield models_1.User.findByPk(id);
                if (!findUser)
                    throw { status: 404, message: 'NotFound user' };
                return { user: findUser };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onDeleteUser({ user, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (user.id !== id && user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근 권한이 없습니다.' };
                const findUser = yield models_1.User.findByPk(id);
                if (!findUser)
                    throw { status: 404, message: 'NotFound user' };
                yield findUser.destroy();
            }
            catch (error) {
                throw error;
            }
        });
    }
    onUpdateUser({ user, id, profile, nickname, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (user.id !== id && user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근 권한이 없습니다.' };
                const findUser = yield models_1.User.findByPk(id);
                if (!findUser)
                    throw { status: 404, message: 'NotFound user' };
                if (!profile && !nickname)
                    throw { status: 400, message: '프로필 또는 닉네임이 있어야 합니다.' };
                const args = {};
                if (profile)
                    args.profile = profile;
                if (nickname) {
                    const findNicknameUser = yield models_1.User.findOne({ where: { nickname } });
                    if (findNicknameUser)
                        throw {
                            status: 400,
                            message: '닉네임을 가진 유저가 이미 존재합니다.',
                        };
                    args.nickname = nickname;
                }
                yield findUser.update(args);
            }
            catch (error) {
                throw error;
            }
        });
    }
    onGetUserRequests({ limit, offset, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: requests, count, } = yield models_1.UserPermissionRequest.findAndCountAll({
                    limit,
                    offset,
                    include: {
                        model: models_1.User,
                        as: 'user',
                    },
                });
                return { requests, count };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onGetUserRequest({ user, id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield models_1.UserPermissionRequest.findByPk(id, {
                    include: {
                        model: models_1.User,
                        as: 'user',
                    },
                });
                if (!request)
                    throw { status: 404, message: 'NotFound request' };
                if (user.id !== request.userId &&
                    user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근 권한이 없습니다.' };
                return { request };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onCreateUserRequest({ user, permission, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield models_1.UserPermissionRequest.create({
                    user,
                    userId: user.id,
                    permission,
                });
                return { request };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onDeleteUserRequest({ user, id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield models_1.UserPermissionRequest.findByPk(id);
                if (!request)
                    throw { status: 404, message: 'NotFound request' };
                if (user.id !== request.userId &&
                    user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근 권한이 없습니다.' };
                yield request.destroy();
            }
            catch (error) {
                throw error;
            }
        });
    }
    onUpdateUserRequest({ user, id, permission, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield models_1.UserPermissionRequest.findByPk(id);
                if (!request)
                    throw { status: 404, message: 'NotFound request' };
                if (user.id !== request.userId &&
                    user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근 권한이 없습니다.' };
                // 어드민일 경우
                if (user.permission === models_1.UserPermission.admin) {
                    const findUser = yield models_1.User.findByPk(request.userId);
                    if (!findUser)
                        throw {
                            status: 404,
                            message: '권한을 수정할 사용자를 찾을 수 없습니다.',
                        };
                    yield findUser.update({ permission });
                }
                yield request.update({ permission });
            }
            catch (error) {
                throw error;
            }
        });
    }
};
UserService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
