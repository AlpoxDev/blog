import type {
  FastifyPluginCallback,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from "fastify";
import cookie, { FastifyCookieOptions } from "fastify-cookie";

import config from "../../../config";

import { studioAuthRoutes } from "./auth";
import { studioReservationRoutes } from "./reservation";
import { studioSettlementRoutes } from "./settlement";
import { studioUserRoutes } from "./user";

export const studioRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.register(cookie, {
    secret: config.COOKIE_KEY,
  } as FastifyCookieOptions);

  fastify.get("/status", {}, (request: Request, reply: Reply) => {
    reply.setCookie("foo", "bar", { signed: true }).send({ foo: "bar" });
  });

  fastify.register(studioAuthRoutes, { prefix: "/auth" });
  fastify.register(studioUserRoutes, { prefix: "/users" });
  fastify.register(studioReservationRoutes, { prefix: "/reservations" });
  fastify.register(studioSettlementRoutes, { prefix: "/settlements" });

  done();
};
