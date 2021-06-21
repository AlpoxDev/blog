import type { FastifyPluginCallback } from "fastify";

export const testRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get("/", async (request, reply) => {
    reply
      .code(200)
      .setCookie("TEST_COOKIE", "TEST_COOKIE", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 24,
        sameSite: "none",
        secure: true,
        signed: true,
      })
      .send({ foo: "bar" });
  });
  done();
};
