import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { StudioUser } from "models/studio/user";

declare module "fastify" {
  interface FastifyRequest {
    user: null | { id: string };
  }
}

const callback: FastifyPluginCallback = async (fastify, options, done) => {
  fastify.decorateRequest("user", null);
  fastify.addHook("preHandler", async (request, reply) => {
    const accessToken: string | undefined = request.cookies["ALPOX_TOKEN"];

    try {
      if (accessToken) {
        const verified = StudioUser.verifyToken(accessToken) as { id: string };
        request.user = { id: verified.id };
      }
    } catch (error) {}
  });

  done();
};

export const tokenPlugin = fp(callback, {
  name: "tokenPlugin",
});

export default tokenPlugin;
