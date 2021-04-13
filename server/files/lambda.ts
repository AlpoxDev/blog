import { APIGatewayProxyEvent } from 'aws-lambda';
import Jimp from 'jimp';
import { nanoid } from 'nanoid';

import onUploadToS3 from './s3';
import onFormParser from './formParser';

type LambdaResponse = {
  status: number;
  body: any;
};

const MAX_SIZE = 1000000;
const MIME_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const isAllowedSize = (size: number) => size <= MAX_SIZE;

const isAllowedMimeType = (mimeType: string) =>
  MIME_TYPES.find((type) => type === mimeType);

const isAllowedFile = (size: number, mimeType: string) =>
  isAllowedSize(size) && isAllowedMimeType(mimeType);

const lambdaResponse = ({ status, body }: LambdaResponse) => ({
  statusCode: status,
  body: JSON.stringify(body),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  },
});

const resize = (
  buffer: Buffer,
  mimeType: string,
  width: number
): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    Jimp.read(buffer)
      .then((image) =>
        image.resize(width, Jimp.AUTO).quality(80).getBufferAsync(mimeType)
      )
      .then((resizedBuffer) => resolve(resizedBuffer))
      .catch((error) => reject(error));
  });

export const handler = async (event: APIGatewayProxyEvent) => {
  const { queryStringParameters } = event;
  const folder = queryStringParameters?.folder || 'guest';

  try {
    const files = await onFormParser(event, MAX_SIZE);
    const file = files[0];

    if (!isAllowedFile(file.content.byteLength, file.mimeType))
      throw { status: 400, message: 'File size or mimeType not allowed' };

    const key = `${folder}/${nanoid()}_${file.filename}`;

    const mimeType = file.mimeType;
    const body = await resize(file.content, mimeType, 500);

    await onUploadToS3({ key, body, mimeType });

    return lambdaResponse({
      status: 201,
      body: { key, location: `https://files.alpox.dev/${key}` },
    });
  } catch (error) {
    console.log(`File Upload Failure`, error);

    const status = error?.status || 500;
    const message = error?.message || 'Server Internal Error';

    return lambdaResponse({ status, body: message });
  }
};
