import type {
  FastifyPluginCallback,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from "fastify";

import { StudioConfig } from "../../../models";

export const studioRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get("/status", {}, (request: Request, reply: Reply) => {
    reply.send({ status: "isAlive!" });
  });

  fastify.get("/sync", async (req: Request, reply: Reply) => {
    try {
    } catch (error) {}
  });

  done();
};
