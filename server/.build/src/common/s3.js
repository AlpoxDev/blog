"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ListParams = exports.S3UploadParams = exports.S3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({});
exports.S3 = new aws_sdk_1.default.S3({ apiVersion: '2006-03-01' });
exports.S3UploadParams = {
    Bucket: 'blog.assets',
    Key: '',
    Body: '',
    ACL: 'public-read',
};
exports.S3ListParams = {
    Bucket: 'blog.assets',
};
