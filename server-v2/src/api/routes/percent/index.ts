import type { FastifyPluginCallback } from "fastify";

import { percentAuthRoutes } from "api/routes/percent/auth";
import { percentConfigRoutes } from "api/routes/percent/config";

export const percentRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.register(percentAuthRoutes, { prefix: "/auth" });
  fastify.register(percentConfigRoutes, { prefix: "/config" });
  done();
};
