import TeleBot from "telebot";
import schedule from "node-schedule";
import { Op } from "sequelize";
import { nanoid } from "nanoid";

import config from "../config";
import {
  StudioConfig,
  StudioCoupon,
  StudioTelegram,
  StudioReservation,
} from "../models";

const TELEGRAM_BOT_TOKEN = config.TELEGRAM_KEY;
const TIMEZONE = "Asia/Seoul";

export const bot = new TeleBot(TELEGRAM_BOT_TOKEN);

const onBotPassword = async (msg: any) => {
  try {
    const userInputs = msg.text.split(" ");
    let [userName, userInput] = [undefined, undefined];

    if (userInputs.length === 3) {
      userName = userInputs[1];
      userInput = userInputs[2];
    } else {
      throw { message: "/listen 사용자 입력이 잘못되었습니다!" };
    }

    const config = await StudioConfig.findByPk("telegram");
    if (!config) throw { message: "/listen 서버 에러!" };

    if (config.value !== userInput) {
      throw { message: "/listen 패스워드가 올바르지 않습니다" };
    } else {
      await StudioTelegram.create({
        name: userName,
        clientId: msg.from.id,
      });
      bot.sendMessage(
        msg.from.id,
        "어서오세요!\n더이상 알람을 안받고 싶으시면 /stop 명령어를 쳐주세요!"
      );
    }
  } catch (error) {
    bot.sendMessage(msg.from.id, error.message);
  }
};

const onBotListenStop = async (msg: any) => {
  try {
    const findClient = await StudioTelegram.findOne({
      where: { clientId: msg.from.id },
    });
    if (findClient) {
      await findClient.destroy();
      bot.sendMessage(msg.from.id, "/stop 완료!");
    } else {
      bot.sendMessage(msg.from.id, "/stop 사용자를 찾을 수 없습니다");
    }
  } catch (error) {
    bot.sendMessage(msg.from.id, "/stop 서버 에러!");
  }
};

export const telegramInit = async () => {
  bot.on(["/start", "/hello"], (msg) =>
    msg.reply.text("Welcome To AlpoxStudioBot!")
  );

  bot.on(`/listen`, onBotPassword);
  bot.on("/stop", onBotListenStop);
  bot.start();

  try {
    const count = await StudioConfig.count();
    if (count === 0) {
      await StudioConfig.create({
        key: "telegram",
        value: nanoid(),
      });
    }
  } catch (error) {}

  // test
  schedule.scheduleJob({ tz: TIMEZONE, rule: "0 */1 * * * *" }, async () => {
    // For New Version Of Sequelize:
    // const where = {
    // 		[Op.or]: [{
    // 				from: {
    // 						[Op.between]: [startDate, endDate]
    // 				}
    // 		}, {
    // 				to: {
    // 						[Op.between]: [startDate, endDate]
    // 				}
    // 		}]
    // };

    // OR as your code structure:
    // const where = {
    // 		$or: [{
    // 				from: {
    // 						$between: [startDate, endDate]
    // 				}
    // 		}, {
    // 				to: {
    // 						$between: [startDate, endDate]
    // 				}
    // 		}]
    // };

    try {
      const clients = await StudioTelegram.findAll();
      const clientIds = clients.map(
        (client: StudioTelegram) => client.clientId
      );

      if (clientIds.length === 0) return;

      const reservationCount = await StudioReservation.count();

      clientIds.forEach((clientId: string) => {
        bot.sendMessage(clientId, `봇 테스트\n총 예약건 : ${reservationCount}`);
      });
    } catch (error) {
      console.log(`telegram | test schedule error`);
    }
  });

  // 하루마다 업데이트
  schedule.scheduleJob({ tz: TIMEZONE, rule: "0 0 0 */1 * *" }, async () => {
    try {
      const config = await StudioConfig.findByPk("telegram");

      if (config) {
        await config.update({ value: nanoid() });
      }
    } catch (error) {
      console.log(`telegram | password update failure`);
    }
  });
};
