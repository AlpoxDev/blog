import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import type { Serverless } from "serverless/aws";
// import queryString from "query-string";

export const upload = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let { body, queryStringParameters } = event;
  // if (body) body = JSON.parse(body);

  return {
    statusCode: 200,
    body: JSON.stringify({ foo: "bar" }),
  };
};
