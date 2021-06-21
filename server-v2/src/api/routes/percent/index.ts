import type { FastifyPluginCallback } from "fastify";

import { percentAuthRoutes } from "api/routes/percent/auth";
import { percentConfigRoutes } from "api/routes/percent/config";
import { percentUserRoutes } from "api/routes/percent/user";

export const percentRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.register(percentAuthRoutes, { prefix: "/auth" });
  fastify.register(percentConfigRoutes, { prefix: "/config" });
  fastify.register(percentUserRoutes, { prefix: "/users" });
  done();
};
