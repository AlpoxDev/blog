import {
  APIGatewayProxyHandler,
  APIGatewayEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import AWS from "aws-sdk";
import Busboy from "busboy";
import { nanoid } from "nanoid";
import { resize } from "./resize";

const MAX_SIZE = 4000000;

const s3 = new AWS.S3({});
const BUCKET = process.env.FILE_BUCKET || "bucket";

type UploadFile = {
  data?: any;
  filename?: string;
  mimeType?: string;
  encoding?: string;
  fieldname?: string;
};

type FileResponse = {
  files: UploadFile[];
  [key: string]: any;
};

export const fileParser = (
  event: APIGatewayEvent,
  maxSize?: number
): Promise<FileResponse> =>
  new Promise((resolve, reject) => {
    const busboy = new Busboy({
      headers: {
        "content-type":
          event.headers["content-type"] || event.headers["Content-Type"],
      },
    });

    const result: FileResponse = {
      files: [],
    };

    busboy.on(
      "file",
      (
        fieldname: string,
        file: NodeJS.ReadableStream,
        filename: string,
        encoding: string,
        mimetype: string
      ) => {
        const uploadFile: UploadFile = {};
        file.on("data", (data) => {
          uploadFile.data = data;
        });
        file.on("end", () => {
          if (uploadFile.data) {
            uploadFile.filename = filename;
            uploadFile.mimeType = mimetype;
            uploadFile.encoding = encoding;
            uploadFile.fieldname = fieldname;
            result.files.push(uploadFile);
          }
        });
      }
    );

    busboy.on("field", (fieldname: any, value) => {
      result[fieldname] = value;
    });

    busboy.on("error", (error: Error) => {
      reject(error);
    });

    busboy.on("finish", () => {
      resolve(result);
    });

    busboy.write(
      event.body as string,
      event.isBase64Encoded ? "base64" : "binary"
    );
    busboy.end();
  }) as Promise<FileResponse>;

const uploadToS3 = (
  bucket: string,
  key: string,
  buffer: Buffer,
  mimeType: string
) =>
  new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });

export const upload: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  let { queryStringParameters } = event;

  let prefix = "guest";
  if (queryStringParameters?.prefix) prefix = queryStringParameters.prefix;

  try {
    const formData = await fileParser(event, MAX_SIZE);
    if (formData.files.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "BadRequest",
        }),
      };
    }

    const file = formData.files[0];
    const fileKey = `${prefix}/${nanoid()}_${file.filename}`;
    const fileData = await resize(file.data, file.mimeType, 800);

    await uploadToS3(BUCKET, fileKey, fileData, file.mimeType as string);

    return {
      statusCode: 201,
      body: JSON.stringify({
        key: fileKey,
        location: `https://image.alpox.dev/${fileKey}`,
      }),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
