import {
  FastifyPluginCallback,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from "fastify";

export const studioReservationRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  // 예약 전체 조회
  fastify.get(
    "/reservations",
    {},
    async (request: Request, reply: Reply) => {}
  );

  // 예약 자세히 조회
  fastify.get(
    "/reservations/:id",
    {},
    async (request: Request, reply: Reply) => {}
  );

  // 예약 생성
  fastify.post(
    "/reservations",
    {},
    async (request: Request, reply: Reply) => {}
  );

  // 예약 삭제
  fastify.delete(
    "/reservations/:id",
    {},
    async (request: Request, reply: Reply) => {}
  );

  // 예약 수정
  fastify.patch(
    "/reservations/:id",
    {},
    async (request: Request, reply: Reply) => {}
  );

  done();
};
