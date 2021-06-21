import { FastifyPluginCallback } from "fastify";
import axios from "axios";

// model
import { PercentUser } from "models/percent/user";

// schema
import LoginBodySchema from "schema/percent/auth/login.json";
import RegisterBodySchema from "schema/percent/auth/register.json";

// types
import { LoginBody } from "types/percent/auth/login";
import { RegisterBody } from "types/percent/auth/register";

export const percentAuthRoutes: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  // 로그인
  fastify.post<{ Body: LoginBody }>(
    "/login",
    {
      schema: { body: LoginBodySchema },
    },
    async (request, reply) => {
      try {
        const { accessToken } = request.body;
        const response = await axios.post(
          "https://kapi.kakao.com/v2/user/me",
          undefined,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status !== 200)
          throw {
            status: 500,
            message: "Server Internal Error in Kakao Login",
          };

        const kakaoId = response.data.id;
        const { nickname: name, profile_image: profile } =
          response.data.properties;

        const findUser = await PercentUser.findOne({
          where: {
            socialId: kakaoId,
          },
        });
        if (!findUser) throw { status: 404, message: { name, profile } };

        reply
          .code(204)
          .setCookie("PERCENT_ALPOX", findUser.getAccessToken(), {
            path: "/",
            maxAge: 60 * 60 * 24 * 24,
            httpOnly: true,
            sameSite: "none",
            signed: true,
          })
          .send();
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  // 회원가입
  fastify.post<{ Body: RegisterBody }>(
    "/register",
    {
      schema: { body: RegisterBodySchema },
    },
    async (request, reply) => {
      const { accessToken, name, profile, phone } = request.body;
      const response = await axios.post(
        "https://kapi.kakao.com/v2/user/me",
        undefined,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status !== 200)
        throw {
          status: 500,
          message: "Server Internal Error in Kakao Login",
        };

      const kakaoId = response.data.id;
      const { nickname, profile_image } = response.data.properties;

      const findUser = await PercentUser.findOne({
        where: {
          socialId: kakaoId,
        },
      });
      if (findUser) throw { status: 404, message: "Already user exist!" };

      const newUser = await PercentUser.create({
        socialId: kakaoId,
        name: name || nickname,
        profile: profile || profile_image,
        phone,
      });

      reply
        .code(204)
        .setCookie("PERCENT_ALPOX", newUser.getAccessToken(), {
          path: "/",
          maxAge: 60 * 60 * 24 * 24,
          httpOnly: true,
          sameSite: "none",
          signed: true,
        })
        .send();
    }
  );

  // 로그아웃
  fastify.post("/logout", async (request, reply) => {
    const { user } = request;
    if (user && user.id) {
      reply.code(204).clearCookie("PERCENT_ALPOX").send();
    } else {
      reply.code(400);
      reply.send();
    }
  });

  done();
};
