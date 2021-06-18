import { FastifyPluginCallback } from "fastify";

export const studioUserRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  // 사용자 목록
  fastify.get("/users", {}, async (request, reply) => {});

  // 사용자 자세히
  fastify.get("/users/:id", {}, async (request, reply) => {});

  // 사용자 탈퇴
  fastify.delete("/users/:id", {}, async (request, reply) => {});

  // 사용자 수정
  fastify.patch("/users/:id", {}, async (request, reply) => {});

  done();
};
