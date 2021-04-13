import { APIGatewayProxyEvent } from 'aws-lambda';
import Busboy from 'busboy';

type FormDataFile = {
  content: any;
  fieldname: string;
  filename: string;
  mimeType: string;
  encoding: string;
};

const onFormParser = (
  event: APIGatewayProxyEvent,
  fileSize: number
): Promise<FormDataFile[]> =>
  new Promise((resolve, reject) => {
    const busboy = new Busboy({
      headers: {
        'content-type':
          event.headers['content-type'] || event.headers['Content-Type'],
      },
      limits: { fileSize },
    });

    const files: FormDataFile[] = [];

    busboy.on('file', (fieldname, file, filename, encoding, mimeType) => {
      const formFile: any = {};

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

    busboy.on('error', (error: any) => {
      reject(error);
    });

    busboy.on('finish', () => {
      resolve(files);
    });

    if (event.body) {
      busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
      busboy.end();
    } else {
      reject({ status: 400, message: 'File Invalid' });
    }
  });

export default onFormParser;
