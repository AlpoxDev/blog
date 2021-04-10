import { Service } from 'typedi';
import { UploadedFile } from 'express-fileupload';

import { S3, S3ListParams, S3UploadParams } from '../common/s3';
import config from '../config';

import { FileServiceProps } from './file.interface';

@Service()
export class FileService {}
