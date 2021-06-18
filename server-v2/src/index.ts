import fastify, { FastifyInstance } from "fastify";

// init setting
import config from "config";
import { telegramInit } from "services";

// routes
import { studioRoutes } from "api/routes";

// plugins
import corsPlugin from "fastify-cors";
import cookiePlugin from "fastify-cookie";
import { tokenPlugin } from "plugins";

console.log(`config loading...`, config);
export default class Server {
  public app: FastifyInstance;
  constructor() {
    this.app = fastify({ logger: true });
  }

  public setting() {
    this.telegram();

    this.pluginSetting();
    this.routerSetting();
    this.errorSetting();
  }

  public pluginSetting() {
    this.app.register(corsPlugin, {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const host = origin.split("://")[1];
        const allowedHost = ["localhost:3000"];
        const allowed = allowedHost.includes(host);
        callback(null, allowed);
      },
    });
    this.app.register(cookiePlugin);
    this.app.register(tokenPlugin);
  }

  public routerSetting() {
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
