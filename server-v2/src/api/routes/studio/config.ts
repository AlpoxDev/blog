import type { FastifyPluginCallback } from "fastify";
import type { SyncOptions } from "sequelize";

import { studioSequelize, StudioConfig } from "models";

// schema
import ConfigSyncSchema from "schema/studio/config/sync.json";
import ConfigTelegramPasswordSchema from "schema/studio/config/telegram-password.json";

// types
import type { ConfigSyncQuery } from "types/studio/config/sync";
import type { ConfigTelegramPassword } from "types/studio/config/telegram-password";

export const studioConfig: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get<{ Querystring: ConfigSyncQuery }>(
    "/sync",
    {
      schema: { querystring: ConfigSyncSchema },
    },
    async (request, reply) => {
      if (request.ip === "127.0.0.1") {
        const { alter, force } = request.query as any;
        const options: SyncOptions = { alter: !!alter, force: !!force };
        studioSequelize.sync(options);

        reply
          .code(200)
          .headers({ "Content-Type": "text/html" })
          .send(`<h1>Studio Database Sync Done</h1>`);
      } else {
        throw { status: 400, message: "Not in localhost" };
      }
    }
  );

  fastify.get<{ Querystring: ConfigTelegramPassword }>(
    "/telegram-password",
    {
      schema: { querystring: ConfigTelegramPasswordSchema },
    },
    async (request, reply) => {
      const { name } = request.query;
      if (name !== "양민열" && name !== "홍정표")
        throw { status: 400, message: "잘못된 접근입니다!" };

      const config = await StudioConfig.findByPk("telegram");
      if (config) {
        reply
          .code(200)
          .headers({ "Content-Type": "text/html" })
          .send(`<h1>Password: ${config.value}</h1>`);
      } else {
        throw { status: 500, message: "Server Internal Error" };
      }
    }
  );

  done();
};
