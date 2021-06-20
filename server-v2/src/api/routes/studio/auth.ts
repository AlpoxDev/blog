import { FastifyPluginCallback } from "fastify";
import axios from "axios";
import config from "config";

// model
import { StudioUser } from "models/studio/user";

// schema
import LoginBodySchema from "schema/studio/auth/login.json";
import RegisterBodySchema from "schema/studio/auth/register.json";

// types
import { LoginBody } from "types/studio/auth/login";
import { RegisterBody } from "types/studio/auth/register";

export const studioAuthRoutes: FastifyPluginCallback = (
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
        const findUser = await StudioUser.findOne({
          where: {
            socialId: kakaoId,
          },
        });
        if (!findUser) throw { status: 404, message: "NotFound user" };

        reply
          .code(204)
          .setCookie("ALPOX_TOKEN", findUser.getAccessToken(), {
            path: "/",
            maxAge: 60 * 60 * 24 * 24,
            httpOnly: true,
            sameSite: "none",
            // secure: true,
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

      const findUser = await StudioUser.findOne({
        where: {
          socialId: kakaoId,
        },
      });
      if (findUser) throw { status: 404, message: "Already user exist!" };

      const newUser = await StudioUser.create({
        socialId: kakaoId,
        name: name || nickname,
        profile: profile || profile_image,
        phone,
      });

      reply
        .code(204)
        .setCookie("ALPOX_TOKEN", newUser.getAccessToken(), {
          path: "/",
          maxAge: 60 * 60 * 24 * 24,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .send();
    }
  );

  done();
};
