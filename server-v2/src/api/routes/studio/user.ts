import { FastifyPluginCallback } from "fastify";
import { userPlugin } from "plugins/userPlugin";

import { StudioUser, StudioUserRole } from "models/studio/user";

export const studioUserRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.register(userPlugin, { fetch: true, tokenType: "studio" });

  // 나의 정보 조회
  fastify.get("/me", {}, async (request, reply) => {
    const { userData } = request;
    const user = {
      id: userData.id,
      name: userData.name,
      profile: userData.profile,
      role: userData.role,
    };

    reply.code(200).send({ user });
  });

  // 사용자 목록
  fastify.get("/", {}, async (request, reply) => {
    const { userData } = request;
    const {} = request.query;

    if (userData.role !== StudioUserRole.ADMIN) {
      throw { status: 401, message: "No Permission" };
    }

    const { count, rows: users } = await StudioUser.findAndCountAll();
    reply.code(200).send({ count, users });
  });

  // 사용자 자세히
  fastify.get("/:id", {}, async (request, reply) => {});

  // 사용자 탈퇴
  fastify.delete("/:id", {}, async (request, reply) => {});

  // 사용자 수정
  fastify.patch("/:id", {}, async (request, reply) => {});

  done();
};
