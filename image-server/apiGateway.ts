import {
  APIGatewayProxyHandler,
  APIGatewayEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";

export const functionWrapper: APIGatewayProxyHandler = (
  event: APIGatewayEvent,
  context: Context
) => {
  const {
    body,
    headers,
    multiValueHeaders,
    pathParameters,
    queryStringParameters,
  } = event;
};
