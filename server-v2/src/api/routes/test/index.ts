import type { FastifyPluginCallback } from "fastify";

// schemas
import TestIndexBodySchema from "schema/test/index/body.json";

// types
import { TestIndexBody } from "types/test/index/body";

export const testRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.post<{ Body: TestIndexBody }>(
    "/",
    {
      schema: { body: TestIndexBodySchema },
    },
    async (request, reply) => {
      const { accessToken } = request.body;
      reply.code(200).send({ foo: "bar", accessToken });
    }
  );

  done();
};
