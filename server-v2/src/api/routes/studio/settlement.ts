import {
  FastifyPluginCallback,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from "fastify";

export const studioSettlementRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  // 정산 목록 조회
  fastify.get("/settlements", {}, async (request: Request, reply: Reply) => {});

  // 정산 자세히 조회
  fastify.get(
    "/settlements/:id",
    {},
    async (request: Request, reply: Reply) => {}
  );

  // 정산 삭제
  fastify.delete(
    "/settlements/:id",
    {},
    async (request: Request, reply: Reply) => {}
  );

  // 정산 수정
  fastify.patch(
    "/settlements/:id",
    {},
    async (request: Request, reply: Reply) => {}
  );

  done();
};
