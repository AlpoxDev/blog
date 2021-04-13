"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.PostService = void 0;
const typedi_1 = require("typedi");
const models_1 = require("../models");
let PostService = class PostService {
    onGetPosts({ user, limit, offset, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: posts, count } = yield models_1.Post.findAndCountAll({
                    where: { userId: user.id },
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                    attributes: ['id', 'title', 'subtitle', 'createdAt'],
                    include: [
                        {
                            model: models_1.User,
                            as: 'user',
                        },
                        {
                            model: models_1.SubCategory,
                            as: 'category',
                        },
                        {
                            model: models_1.Tag,
                            as: 'tags',
                            attributes: ['id', 'name'],
                        },
                    ],
                });
                return { posts, count };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onGetPost({ user, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield models_1.Post.findOne({
                    where: { id, userId: user.id },
                    include: [
                        {
                            model: models_1.User,
                            as: 'user',
                        },
                        {
                            model: models_1.Series,
                            as: 'series',
                        },
                        {
                            model: models_1.SubCategory,
                            as: 'category',
                        },
                        {
                            model: models_1.Tag,
                            as: 'tags',
                            attributes: ['id', 'name'],
                        },
                    ],
                });
                if (!post)
                    throw { status: 404, message: '게시글을 찾을 수 없습니다.' };
                return { post };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onCreatePost({ user, title, subtitle, content, category, series, tags, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findCategory = yield models_1.SubCategory.find(category);
                if (!findCategory)
                    throw { status: 404, message: '서브 카테고리를 찾을 수 없습니다.' };
                let findSeries = null;
                if (series)
                    findSeries = yield models_1.Series.find(series);
                const post = yield models_1.Post.create({
                    title,
                    subtitle,
                    content,
                    user,
                    userId: user.id,
                    category: findCategory,
                    categoryId: findCategory.id,
                    series: findSeries,
                    seriesId: (findSeries === null || findSeries === void 0 ? void 0 : findSeries.id) || null,
                });
                const findTags = yield models_1.Tag.findOrCreateList(user, tags);
                const relations = findTags.map((tag) => ({
                    postId: post.id,
                    tagId: tag.id,
                }));
                yield models_1.PostTag.setPostTagRelations(relations);
                return { post };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onDeletePost({ user, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield models_1.Post.findByPk(id);
                if (!post)
                    throw { status: 404, message: 'NotFound post' };
                if (user.id !== post.userId && user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근 권한이 없습니다.' };
                yield post.destroy();
            }
            catch (error) {
                throw error;
            }
        });
    }
    onUpdatePost({ user, id, title, subtitle, content, category, series, tags, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield models_1.Post.findByPk(id);
                if (!post)
                    throw { status: 404, message: 'NotFound post' };
                if (user.id !== post.userId && user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근 권한이 없습니다.' };
                const findCategory = yield models_1.SubCategory.find(category);
                if (!findCategory)
                    throw { status: 404, message: '서브 카테고리를 찾을 수 없습니다.' };
                let findSeries = null;
                if (series)
                    findSeries = yield models_1.Series.find(series);
                yield post.update({
                    title,
                    subtitle,
                    content,
                    category: findCategory,
                    categoryId: findCategory.id,
                    series: findSeries,
                    seriesId: (findSeries === null || findSeries === void 0 ? void 0 : findSeries.id) || null,
                });
                const findTags = yield models_1.Tag.findOrCreateList(user, tags);
                const relations = findTags.map((tag) => ({
                    postId: post.id,
                    tagId: tag.id,
                }));
                yield models_1.PostTag.resetPostTagRelations(post.id);
                yield models_1.PostTag.setPostTagRelations(relations);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
PostService = __decorate([
    typedi_1.Service()
], PostService);
exports.PostService = PostService;
