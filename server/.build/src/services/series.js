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
exports.SeriesService = void 0;
const typedi_1 = require("typedi");
const models_1 = require("../models");
let SeriesService = class SeriesService {
    onGetSeriesList({ user, limit, offset, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: seriesList, count } = yield models_1.Series.findAndCountAll({
                    where: { userId: user.id },
                    limit,
                    offset,
                });
                return { seriesList, count };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onGetSeries({ user, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const series = yield models_1.Series.findOne({
                    where: {
                        id,
                        userId: user.id,
                    },
                });
                if (!series)
                    throw { status: 404, message: 'NotFound series' };
                return { series };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onCreateSeries({ user, title, content, posts, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const series = yield models_1.Series.create({
                    user,
                    userId: user.id,
                    title,
                    content,
                });
                if (posts) {
                    for (const i in posts) {
                        const post = yield models_1.Post.findByPk(posts[i]);
                        if (!post)
                            throw {
                                status: 404,
                                message: '시리즈에 연결할 포스트를 찾을 수 없습니다.',
                            };
                        yield post.update({
                            series,
                            seriesId: series.id,
                            sequence: i,
                        });
                    }
                }
                yield series.getPosts();
                return { series };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onDeleteSeries({ user, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const series = yield models_1.Series.findOne({
                    where: { id, userId: user.id },
                });
                if (!series)
                    throw { status: 404, message: 'NotFound series' };
                if (series.userId !== user.id && user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근권한이 없습니다.' };
                yield models_1.Post.update({
                    series: null,
                    seriesId: null,
                }, {
                    where: { seriesId: id },
                });
                yield series.destroy();
            }
            catch (error) {
                throw error;
            }
        });
    }
    onUpdateSeries({ user, id, title, content, posts, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const series = yield models_1.Series.findOne({
                    where: { id, userId: user.id },
                });
                if (!series)
                    throw { status: 404, message: 'NotFound series' };
                if (series.userId !== user.id && user.permission !== models_1.UserPermission.admin)
                    throw { status: 401, message: '접근권한이 없습니다.' };
                yield series.update({
                    title,
                    content,
                });
                if (posts) {
                    yield models_1.Post.update({
                        series: null,
                        seriesId: null,
                    }, {
                        where: { userId: user.id, seriesId: series.id },
                    });
                    for (const i in posts) {
                        const post = yield models_1.Post.findByPk(id);
                        if (!post)
                            throw {
                                status: 404,
                                message: '시리즈에 연결할 포스트를 찾을 수 없습니다.',
                            };
                        yield post.update({
                            series,
                            seriesId: series.id,
                            sequence: i,
                        });
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
};
SeriesService = __decorate([
    typedi_1.Service()
], SeriesService);
exports.SeriesService = SeriesService;
