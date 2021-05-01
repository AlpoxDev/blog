import type { Serverless } from "serverless/aws";

const config: Serverless = {
  service: "alpox-utils-server",
  disabledDeprecations: ["*"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: "ap-northeast-2",
    stage: "prod",
    lambdaHashingVersion: 20201221,
    deploymentBucket: { name: "alpox-blog-util-server" },
    iam: {
      role: "",
    },
  },
  custom: {
    "serverless-offline": {
      httpPort: 8000,
      noPrependStageInUrl: true,
    },
  },
  functions: {
    image: {
      handler: "handler.upload",
      description: "Blog File Server",
      timeout: 20,
      memorySize: 2048,
      events: [
        {
          http: {
            path: "/file",
            method: "POST",
            cors: true,
            async: true,
          },
        },
      ],
    },
  },
};

module.exports = config;
