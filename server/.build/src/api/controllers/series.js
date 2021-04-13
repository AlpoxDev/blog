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
exports.SeriesController = void 0;
const typedi_1 = require("typedi");
const services_1 = require("../../services");
class SeriesController {
    static onGetSeriesList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, limit, offset } = req;
            try {
                const seriesService = typedi_1.Container.get(services_1.SeriesService);
                const response = yield seriesService.onGetSeriesList({
                    user,
                    limit,
                    offset,
                });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onGetSeries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = user;
            try {
                const seriesService = typedi_1.Container.get(services_1.SeriesService);
                const response = yield seriesService.onGetSeries({ user, id });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onCreateSeries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                const seriesService = typedi_1.Container.get(services_1.SeriesService);
                const response = yield seriesService.onCreateSeries(Object.assign({ user }, req.body));
                res.status(201).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onDeleteSeries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            try {
                const seriesService = typedi_1.Container.get(services_1.SeriesService);
                yield seriesService.onDeleteSeries({ user, id });
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
    static onUpdateSeries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.params;
            try {
                const seriesService = typedi_1.Container.get(services_1.SeriesService);
                yield seriesService.onUpdateSeries(Object.assign({ user, id }, req.body));
                res.status(204).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.SeriesController = SeriesController;
