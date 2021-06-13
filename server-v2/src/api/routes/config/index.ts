import type {
  FastifyPluginCallback,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from "fastify";
import type { SyncOptions } from "sequelize";
import sequelize from "../../../models";

export const configRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get("/sync", (request: Request, reply: Reply) => {
    if (request.ip === "127.0.0.1") {
      const { alter, force } = request.query as any;
      const options: SyncOptions = { alter: !!alter, force: !!force };
      sequelize.sync(options);

      reply
        .code(200)
        .headers({ "Content-Type": "text/html" })
        .send(`<h1>Sync Done</h1>`);
    } else {
      throw { status: 400, message: "Not in localhost" };
    }
  });

  done();
};
