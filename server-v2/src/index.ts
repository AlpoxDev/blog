import fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";

import config from "./config";
import { studioRoutes, configRoutes } from "./api/routes";
import { telegramInit } from "./services";

console.log(`config loading...`, config);

export default class Server {
  public app: FastifyInstance;
  constructor() {
    this.app = fastify({ logger: true });
  }

  public setting() {
    this.telegram();

    this.serverSetting();
    this.routerSetting();
    this.errorSetting();
  }

  public serverSetting() {}

  public routerSetting() {
    this.app.register(configRoutes, { prefix: "/config" });
    this.app.register(studioRoutes, { prefix: "/studio" });
  }

  public errorSetting() {
    this.app.setErrorHandler((error: any, request, reply) => {
      const statusCode = error?.status || 500;
      const message = error?.message || "Server Internal Error";

      reply.code(statusCode).send({
        statusCode,
        message,
      });
    });
  }

  public telegram() {
    telegramInit();
  }

  public async listen() {
    try {
      await this.app.listen(config.PORT || 8080, "0.0.0.0");
      console.log(`Server 0.0.0.0:${config.PORT} Listening...`);
    } catch (error) {
      this.app.log.error(error);
      process.exit(1);
    }
  }

  public get() {
    return this.app;
  }
}

(() => {
  const server = new Server();
  server.setting();
  server.listen();
})();
