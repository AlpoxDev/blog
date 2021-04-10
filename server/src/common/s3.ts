import AWS from 'aws-sdk';
import { PutObjectRequest, ListObjectsRequest } from 'aws-sdk/clients/s3';

AWS.config.update({});

export const S3 = new AWS.S3({ apiVersion: '2006-03-01' });

export const S3UploadParams: PutObjectRequest = {
  Bucket: 'blog.assets',
  Key: '',
  Body: '',
  ACL: 'public-read',
};

export const S3ListParams: ListObjectsRequest = {
  Bucket: 'blog.assets',
};
