import {
  FastifyPluginCallback,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from "fastify";

export const studioTelegramRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  // 텔레그램 패스워드 조회
  fastify.get(
    "/telegram/password",
    {},
    async (request: Request, reply: Reply) => {}
  );

  // 텔레그램 사용자들 조회
  fastify.get(
    "/telegram/users",
    {},
    async (request: Request, reply: Reply) => {}
  );

  // 텔레그램 사용자들 삭제
  fastify.delete(
    "/telegram/users/:id",
    {},
    async (request: Request, reply: Reply) => {}
  );

  done();
};
