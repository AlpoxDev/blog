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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const jimp_1 = __importDefault(require("jimp"));
const nanoid_1 = require("nanoid");
const s3_1 = __importDefault(require("./s3"));
const formParser_1 = __importDefault(require("./formParser"));
const MAX_SIZE = 1000000;
const MIME_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'text/html'];
const isAllowedSize = (size) => size <= MAX_SIZE;
const isAllowedMimeType = (mimeType) => MIME_TYPES.find((type) => type === mimeType);
const isAllowedFile = (size, mimeType) => isAllowedSize(size) && isAllowedMimeType(mimeType);
const lambdaResponse = ({ status, body }) => ({
    statusCode: status,
    body: JSON.stringify(body),
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*',
    },
});
const resize = (buffer, mimeType, width) => new Promise((resolve, reject) => {
    jimp_1.default.read(buffer)
        .then((image) => image.resize(width, jimp_1.default.AUTO).quality(80).getBufferAsync(mimeType))
        .then((resizedBuffer) => resolve(resizedBuffer))
        .catch((error) => reject(error));
});
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { queryStringParameters } = event;
    const folder = (queryStringParameters === null || queryStringParameters === void 0 ? void 0 : queryStringParameters.folder) || 'guest';
    try {
        const files = yield formParser_1.default(event, MAX_SIZE);
        const file = files[0];
        if (!isAllowedFile(file.content.byteLength, file.mimeType))
            throw { status: 400, message: 'File size or mimeType not allowed' };
        const key = `${folder}/${nanoid_1.nanoid()}_${file.filename}`;
        const mimeType = file.mimeType;
        const body = yield resize(file.content, mimeType, 500);
        yield s3_1.default({ key, body, mimeType });
        return lambdaResponse({
            status: 201,
            body: { key, location: `https://files.alpox.dev/${key}` },
        });
    }
    catch (error) {
        console.log(`File Upload Failure`, error);
        const status = (error === null || error === void 0 ? void 0 : error.status) || 500;
        const message = (error === null || error === void 0 ? void 0 : error.message) || 'Server Internal Error';
        return lambdaResponse({ status, body: message });
    }
});
exports.handler = handler;
