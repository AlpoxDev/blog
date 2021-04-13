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
exports.TagService = void 0;
const typedi_1 = require("typedi");
const post_1 = require("./post");
const models_1 = require("../models");
let TagService = class TagService {
    constructor() {
        this.postService = typedi_1.Container.get(post_1.PostService);
    }
    onGetTags({ user, limit, offset }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: tags, count } = yield models_1.Tag.findAndCountAll({
                    where: { userId: user.id },
                    limit,
                    offset,
                });
                return { tags, count };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onGetTag({ user, id, limit, offset }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tag = yield models_1.Tag.findByPk(id);
                if (!tag)
                    throw { status: 404, message: 'NotFound tag' };
                const { posts, count } = yield this.postService.onGetPosts({
                    user,
                    limit,
                    offset,
                });
                return { tag: Object.assign(Object.assign({}, tag.toJSON()), { posts }), count };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onCreateTag({ user, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tag = yield models_1.Tag.create({
                    user,
                    userId: user.id,
                    name,
                });
                return { tag };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onDeleteTag({ user, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tag = yield models_1.Tag.findOne({ where: { id, userId: user.id } });
                if (!tag)
                    throw { status: 404, message: 'NotFound tag' };
                if (tag.userId !== user.id && user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근권한이 없습니다.' };
                yield models_1.PostTag.destroy({
                    where: { tagId: tag.id },
                });
                yield tag.destroy();
            }
            catch (error) {
                throw error;
            }
        });
    }
    onUpdateTag({ user, id, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tag = yield models_1.Tag.findOne({
                    where: { id, userId: user.id },
                });
                if (!tag)
                    throw { status: 404, message: 'NotFound tag' };
                if (tag.userId !== user.id && user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근권한이 없습니다.' };
                yield tag.update({ name });
            }
            catch (error) {
                throw error;
            }
        });
    }
};
TagService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], TagService);
exports.TagService = TagService;
