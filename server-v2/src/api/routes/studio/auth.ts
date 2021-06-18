import {
  FastifyPluginCallback,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from "fastify";

import { signToken } from "services";

export const studioAuthRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  // 로그인
  fastify.get<{}>("/login", {}, async (req: Request, reply: Reply) => {
    reply.code(200).send({
      jwtTest: signToken({ foo: "bar" }),
    });
  });

  // 회원가입
  fastify.post("/register", {}, async (request: Request, reply: Reply) => {
    reply.code(201).send({
      method: "/login",
    });
  });

  done();
};
