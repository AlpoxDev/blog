import type { FastifyPluginCallback } from "fastify";

import { studioConfig } from "api/routes/studio/config";
import { studioAuthRoutes } from "api/routes/studio/auth";
import { studioReservationRoutes } from "api/routes/studio/reservation";
import { studioSettlementRoutes } from "api/routes/studio/settlement";
import { studioUserRoutes } from "api/routes/studio/user";

export const studioRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(studioConfig, { prefix: "/config" });
  fastify.register(studioAuthRoutes, { prefix: "/auth" });
  fastify.register(studioUserRoutes, { prefix: "/users" });
  fastify.register(studioReservationRoutes, { prefix: "/reservations" });
  fastify.register(studioSettlementRoutes, { prefix: "/settlements" });

  done();
};
