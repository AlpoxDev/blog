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
    const cookie: string | undefined =
      request.cookies["STUDIO_ALPOX"] || request.cookies["PERCENT_ALPOX"];
    let accessToken: string | undefined;
    if (cookie) accessToken = request.unsignCookie(cookie)?.value;

    try {
      if (accessToken) {
        const verified = StudioUser.verifyToken(accessToken) as {
          id: string;
          type: string;
        };
        request.user = { ...verified };
      }
    } catch (error) {}
  });

  done();
};

export const tokenPlugin = fp(callback, {
  name: "tokenPlugin",
});

export default tokenPlugin;
