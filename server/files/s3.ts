import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

const Bucket = process.env.BUCKET || '';

type UploadToS3 = {
  key: string;
  body: Buffer;
  mimeType: string;
};

const onUploadToS3 = async ({ key, body, mimeType }: UploadToS3) => {
  try {
    return await s3
      .upload({
        Bucket,
        Key: key,
        Body: body,
        ContentType: mimeType,
        ACL: 'public-read',
      })
      .promise();
  } catch (error) {
    throw error;
  }
};

export default onUploadToS3;
