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
exports.CategoryService = void 0;
const typedi_1 = require("typedi");
const models_1 = require("../models");
let CategoryService = class CategoryService {
    onGetCategorys({ user, limit, offset, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows: categorys, count } = yield models_1.MainCategory.findAndCountAll({
                    where: { userId: user.id },
                    limit,
                    offset,
                    include: {
                        model: models_1.SubCategory,
                        as: 'subCategorys',
                        separate: true,
                        order: [['sequence', 'ASC']],
                    },
                    order: [['sequence', 'ASC']],
                });
                return { categorys, count };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onGetCategory({ user, id, limit, offset, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield models_1.SubCategory.findOne({
                    where: {
                        id,
                        userId: user.id,
                    },
                });
                if (!category)
                    throw { status: 404, message: 'NotFound sub-category' };
                const { rows: posts, count } = yield models_1.Post.findAndCountAll({
                    where: { categoryId: category.id },
                    limit,
                    offset,
                });
                return { category: Object.assign(Object.assign({}, category.toJSON()), { posts }), count };
            }
            catch (error) {
                throw error;
            }
        });
    }
    onCreateAndUpdateCategorys({ user, categorys, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 기존 assoication 삭제
                yield models_1.MainCategory.update({
                    user: null,
                    userId: null,
                }, {
                    where: { userId: user.id },
                });
                yield models_1.SubCategory.update({
                    userId: null,
                    user: null,
                    mainCategory: null,
                    mainCategoryId: null,
                }, {
                    where: { userId: user.id },
                });
                for (const i in categorys) {
                    const mainCategory = categorys[i];
                    let newMainCategory;
                    if (mainCategory.id) {
                        const findMainCategory = yield models_1.MainCategory.findByPk(mainCategory.id);
                        if (!findMainCategory)
                            throw {
                                status: 404,
                                message: '수정하고자 하는 메인카테고리를 찾을 수 없습니다.',
                            };
                        newMainCategory = yield findMainCategory.update({
                            user,
                            userId: user.id,
                            name: mainCategory.name,
                            sequence: i,
                        });
                    }
                    else if (mainCategory.name) {
                        newMainCategory = yield models_1.MainCategory.create({
                            user,
                            userId: user.id,
                            name: mainCategory.name,
                            sequence: i,
                        });
                    }
                    else {
                        throw {
                            status: 400,
                            message: 'BadRequest: id 또는 name 모두 존재하지 않습니다.',
                        };
                    }
                    // 재 생성 및 수정 / 재 연결
                    for (const j in mainCategory.subCategorys) {
                        const subCategory = mainCategory.subCategorys[j];
                        let newSubCategory;
                        if (subCategory.id) {
                            const findSubCategory = yield models_1.SubCategory.findByPk(subCategory.id);
                            if (!findSubCategory)
                                throw {
                                    status: 404,
                                    message: '수정하고자 하는 서브카테고리를 찾을 수 없습니다.',
                                };
                            newSubCategory = yield findSubCategory.update({
                                name: subCategory.name,
                                sequence: j,
                                user,
                                userId: user.id,
                                mainCategory: newMainCategory,
                                mainCategoryId: newMainCategory.id,
                            });
                        }
                        else if (subCategory.name) {
                            newSubCategory = yield models_1.SubCategory.create({
                                name: subCategory.name,
                                sequence: j,
                                userId: user.id,
                                mainCategoryId: newMainCategory.id,
                            });
                        }
                        else {
                            throw {
                                status: 400,
                                message: 'BadRequest: id 또는 name 모두 존재하지 않습니다.',
                            };
                        }
                    }
                }
                yield models_1.SubCategory.destroy({
                    where: { userId: null },
                });
                yield models_1.MainCategory.destroy({
                    where: { userId: null },
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
};
CategoryService = __decorate([
    typedi_1.Service()
], CategoryService);
exports.CategoryService = CategoryService;
