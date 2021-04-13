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
exports.PostController = void 0;
const typedi_1 = require("typedi");
const services_1 = require("../../services");
class PostController {
    static onGetPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, limit, offset } = req;
            try {
                const postService = typedi_1.Container.get(services_1.PostService);
                const response = yield postService.onGetPosts({ user, limit, offset });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onGetPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            try {
                const postService = typedi_1.Container.get(services_1.PostService);
                const response = yield postService.onGetPost({ user, id });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onCreatePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                const postService = typedi_1.Container.get(services_1.PostService);
                const response = yield postService.onCreatePost(Object.assign({ user }, req.body));
                res.status(201).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onDeletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            try {
                const postService = typedi_1.Container.get(services_1.PostService);
                yield postService.onDeletePost({ user, id });
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onUpdatePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            try {
                const postService = typedi_1.Container.get(services_1.PostService);
                yield postService.onUpdatePost(Object.assign({ user, id }, req.body));
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PostController = PostController;
