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
exports.TagController = void 0;
const typedi_1 = require("typedi");
const services_1 = require("../../services");
class TagController {
    static onGetTags(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, limit, offset } = req;
            try {
                const tagService = typedi_1.Container.get(services_1.TagService);
                const response = yield tagService.onGetTags({ user, limit, offset });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onGetTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, limit, offset } = req;
            const { id } = req.params;
            try {
                const tagService = typedi_1.Container.get(services_1.TagService);
                const response = yield tagService.onGetTag({ user, id, limit, offset });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onCreateTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { name } = req.body;
            try {
                const tagService = typedi_1.Container.get(services_1.TagService);
                const response = yield tagService.onCreateTag({ user, name });
                res.status(201).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onDeleteTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            try {
                const tagService = typedi_1.Container.get(services_1.TagService);
                yield tagService.onDeleteTag({ user, id });
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onUpdateTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            const { name } = req.body;
            try {
                const tagService = typedi_1.Container.get(services_1.TagService);
                yield tagService.onUpdateTag({ user, id, name });
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TagController = TagController;
