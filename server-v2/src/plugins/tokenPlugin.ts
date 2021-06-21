import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { StudioUser, PercentUser } from "models";

declare module "fastify" {
  interface FastifyRequest {
    user: null | { id: string };
  }
}

const callback: FastifyPluginCallback = async (fastify, options, done) => {
  fastify.decorateRequest("user", null);
  fastify.addHook("preHandler", async (request, reply) => {
    let tokenType: "studio" | "percent" | undefined;
    let cookie: string | undefined;

    if (request.cookies["STUDIO_ALPOX"]) {
      tokenType = "studio";
      cookie = request.cookies["STUDIO_ALPOX"];
    }
    if (request.cookies["PERCENT_ALPOX"]) {
      tokenType = "percent";
      cookie = request.cookies["PERCENT_ALPOX"];
    }

    let accessToken: string | undefined;
    if (cookie) accessToken = request.unsignCookie(cookie)?.value;

    try {
      if (accessToken && tokenType === "studio") {
        const verified = StudioUser.verifyToken(accessToken) as {
          id: string;
          type: string;
        };
        request.user = { ...verified };
      }

      if (accessToken && tokenType === "percent") {
        const verified = PercentUser.verifyToken(accessToken) as {
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
