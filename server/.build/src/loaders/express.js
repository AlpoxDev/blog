"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// middleware
const cors_1 = __importDefault(require("cors"));
const celebrate_1 = require("celebrate");
const request_ip_1 = __importDefault(require("request-ip"));
// router
const routers_1 = __importDefault(require("../api/routers"));
// config
const models_1 = __importDefault(require("../models"));
exports.default = (app) => {
    app.use(cors_1.default());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.use(express_1.json({ limit: '500mb' }));
    app.use(express_1.urlencoded({ limit: '500mb', extended: true }));
    app.use(routers_1.default);
    app.use(celebrate_1.errors());
    app.use((err, req, res, next) => {
        const error = {
            status: err.status || 500,
            message: err.message || 'Server Internal Error',
        };
        console.log(`Error!`, err);
        res.status(error.status).json(error);
    });
    app.get('/sync', (req, res) => {
        const clientIP = request_ip_1.default.getClientIp(req);
        const { alter, force } = req.query;
        if (clientIP === '::1' ||
            clientIP === '::ffff:127.0.0.1' ||
            clientIP === '127.0.0.1') {
            const args = {};
            if (alter)
                args.alter = true;
            if (force)
                args.force = true;
            models_1.default.sync(args);
            res.status(200).contentType('html').send('<h1>Sync done!</h1>');
        }
        else {
            console.log(clientIP);
            res.status(200).contentType('html').send('<h1>Not in localhost</h1>');
        }
    });
    app.use((req, res) => {
        res.status(404).contentType('html').send(`<h1>BLOG API</h1>`);
    });
};
