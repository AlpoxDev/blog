"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const busboy_1 = __importDefault(require("busboy"));
const onFormParser = (event, fileSize) => new Promise((resolve, reject) => {
    const busboy = new busboy_1.default({
        headers: {
            'content-type': event.headers['content-type'] || event.headers['Content-Type'],
        },
        limits: { fileSize },
    });
    const files = [];
    busboy.on('file', (fieldname, file, filename, encoding, mimeType) => {
        const formFile = {};
        console.log(formFile);
        file.on('data', (data) => {
            formFile.content = data;
        });
        file.on('end', () => {
            if (formFile.content) {
                formFile.filename = filename;
                formFile.mimeType = mimeType;
                formFile.encoding = encoding;
                formFile.fieldname = fieldname;
                files.push(formFile);
            }
        });
    });
    busboy.on('error', (error) => {
        reject(error);
    });
    busboy.on('finish', () => {
        resolve(files);
    });
    if (event.body) {
        busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
        busboy.end();
    }
    else {
        reject({ status: 400, message: 'File Invalid' });
    }
});
exports.default = onFormParser;
