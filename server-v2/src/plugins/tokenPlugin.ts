import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { verifyToken } from "services/token";

declare module "fastify" {
  interface FastifyRequest {
    user: null | { id: string };
  }
}

const callback: FastifyPluginCallback = async (fastify, options, done) => {
  fastify.decorateRequest("user", null);
  fastify.addHook("preHandler", async (request, reply) => {
    const accessToken: string | undefined = request.cookies["ACCESS_TOKEN"];
    try {
      const verified = verifyToken<{ id: string }>(accessToken);
      request.user = { id: verified.id };
    } catch (error) {}
  });

  done();
};

export const tokenPlugin = fp(callback, {
  name: "tokenPlugin",
});
