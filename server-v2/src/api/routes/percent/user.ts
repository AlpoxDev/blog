import type { FastifyPluginCallback } from "fastify";
import { userPlugin } from "plugins/userPlugin";

import { PercentUser, PercentUserRole } from "models/percent/user";

// schema
import GetUserParamsSchema from "schema/percent/user/getUser/params.json";
import DeleteUserParamsSchema from "schema/percent/user/deleteUser/params.json";
import UpdateUserParamsSchema from "schema/percent/user/updateUser/params.json";
import UpdateUserBodySchema from "schema/percent/user/updateUser/body.json";

// types
import type { GetUserParams } from "types/percent/user/getUser/params";
import type { DeleteUserParams } from "types/percent/user/deleteUser/params";
import type { UpdateUserParams } from "types/percent/user/updateUser/params";
import type { UpdateUserBody } from "types/percent/user/updateUser/body";

export const percentUserRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.register(userPlugin, { fetch: true, tokenType: "percent" });

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
    const { userData, limit, offset } = request;
    if (userData.role === PercentUserRole.ADMIN) {
      const { count, rows: users } = await PercentUser.findAndCountAll({
        limit,
        offset,
      });

      reply.code(200).send({
        count,
        users,
      });
    } else {
      throw { status: 401, message: "권한이 없습니다" };
    }
  });

  // 사용자 자세히
  fastify.get<{ Params: GetUserParams }>(
    "/:id",
    {
      schema: { params: GetUserParamsSchema },
    },
    async (request, reply) => {
      const { id } = request.params;

      const user = await PercentUser.findByPk(id, {
        attributes: ["id", "name", "profile", "role", "createdAt"],
      });
      reply.code(200).send({ user });
    }
  );

  // 사용자 탈퇴
  fastify.delete<{ Params: DeleteUserParams }>(
    "/:id",
    {
      schema: { params: DeleteUserParamsSchema },
    },
    async (request, reply) => {
      const { userData } = request;
      const { id } = request.params;

      if (
        userData.id !== id &&
        userData.role !== PercentUserRole.ADMIN
      )
        throw { status: 401, message: "권한이 없습니다" };

      const findUser = await PercentUser.findByPk(id);
      if (!findUser) throw { status: 404, message: "NotFound user" };

      await findUser.destroy();
        reply.code(204).send();
    }
  );

  // 사용자 수정
  fastify.patch<{ Params: UpdateUserParams; Body: UpdateUserBody }>(
    "/:id",
    {
      schema: {
        params: UpdateUserParamsSchema,
        body: UpdateUserBodySchema,
      },
    },
    async (request, reply) => {
      const { userData } = request;
      const { id } = request.params;
      const { name, profile } = request.body;

      if (userData.id !== id && userData.role !== PercentUserRole.ADMIN)
        throw { status: 401, message: "권한이 없습니다" };

      const findUser = await PercentUser.findByPk(id);
      if (!findUser)
        throw { status: 404, message: "사용자를 찾을 수 없습니다." };

      await findUser.update({
        name: name || findUser.name,
        profile: profile || findUser.profile,
      });

      reply.code(204).send();
    }
  );

  done();
};
