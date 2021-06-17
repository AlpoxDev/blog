import type {
  FastifyPluginCallback,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from "fastify";

import { StudioConfig, StudioUser } from "../../../models";

export const studioRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get("/status", {}, (request: Request, reply: Reply) => {
    reply.send({ status: "isAlive!" });
  });

  // 회원가입
  fastify.post(
    "/auth/register",
    {},
    async (request: Request, reply: Reply) => {}
  );
  // 로그인
  fastify.post("/auth/login", {}, async (request: Request, reply: Reply) => {});

  // 사용자 목록
  fastify.get("/users", {}, async (request: Request, reply: Reply) => {});

  // 사용자 자세히
  fastify.get("/users/:id", {}, async (request: Request, reply: Reply) => {});

  // 사용자 탈퇴
  fastify.delete(
    "/users/:id",
    {},
    async (request: Request, reply: Reply) => {}
  );

  // 사용자 수정
  fastify.patch("/users/:id", {}, async (request: Request, reply: Reply) => {});

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
