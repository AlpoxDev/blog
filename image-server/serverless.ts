import type { AWS } from "@serverless/typescript";

const config: AWS = {
  service: "alpox-utils-server",
  disabledDeprecations: ["*"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: "ap-northeast-2",
    stage: "prod",
    deploymentBucket: { name: "alpox-blog-util-server" },
    environment: {
      FILE_BUCKET: "alpox-blog-files",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "s3:PutObject",
              "s3:PutObjectAcl",
              "s3:GetObject",
              "s3:GetObjectAcl",
              "s3:DeleteObject",
            ],
            Resource: "arn:aws:s3:::alpox-blog-files/*",
          },
        ],
      },
    },
  },
  custom: {
    "serverless-offline": {
      httpPort: 8000,
      noPrependStageInUrl: true,
    },
  },
  plugins: ["serverless-plugin-typescript", "serverless-offline"],
  functions: {
    image: {
      handler: "handler.upload",
      description: "Blog File Server",
      timeout: 20,
      memorySize: 2048,
      events: [
        {
          http: {
            path: "/upload",
            method: "POST",
            cors: true,
          },
        },
      ],
    },
  },
};

module.exports = config;
