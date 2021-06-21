import type { FastifyPluginCallback } from "fastify";
import type { SyncOptions } from "sequelize";

import { percentSequelize } from "models";

// schema
import ConfigSyncSchema from "schema/percent/config/sync.json";

// types
import type { ConfigSyncQuery } from "types/studio/config/sync";

export const percentConfigRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.get<{ Querystring: ConfigSyncQuery }>(
    "/sync",
    {
      schema: { querystring: ConfigSyncSchema },
    },
    async (request, reply) => {
      if (request.ip === "127.0.0.1") {
        const { alter, force } = request.query as any;
        const options: SyncOptions = { alter: !!alter, force: !!force };
        percentSequelize.sync(options);

        reply
          .code(200)
          .headers({ "Content-Type": "text/html" })
          .send(`<h1>Percent Database Sync Done</h1>`);
      } else {
        throw { status: 400, message: "Not in localhost" };
      }
    }
  );

  done();
};
