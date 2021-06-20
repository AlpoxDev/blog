import type { FastifyPluginAsync, FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

import { StudioUser } from "models/studio/user";

const callback: FastifyPluginAsync<{ fetch: boolean }> = async (
  fastify,
  options
) => {
  const { fetch = true } = options;
  fastify.decorateRequest("userData", null);
  fastify.addHook("preHandler", async (request, reply) => {
    if (!request.user) {
      throw { status: 401, message: "Unauthorized" };
    }
    if (fetch) {
      const userData = await StudioUser.findByPk(request.user.id, {
        attributes: ["id", "socialId", "role", "name", "profile", "phone"],
      });
      if (!userData) throw { status: 401, message: "Authorization Failure!" };

      request.userData = userData;
    }
  });
};

declare module "fastify" {
  interface FastifyRequest {
    userData: StudioUser | null;
  }
}

export const userPlugin = fp(callback, {
  name: "userPlugin",
});

export default userPlugin;
