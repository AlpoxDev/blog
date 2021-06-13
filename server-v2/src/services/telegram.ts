import TeleBot from "telebot";
import schedule from "node-schedule";
import { nanoid } from "nanoid";

import config from "../config";
import { StudioConfig } from "../models";

const TELEGRAM_BOT_TOKEN = config.TELEGRAM_KEY;
export const bot = new TeleBot(TELEGRAM_BOT_TOKEN);

// scheulde
const Timezone = "Asia/Seoul";
export let clientIds: string[] = [];

const onBotPassword = async (msg: any) => {
  try {
    const userInputs = msg.text.split(" ");
    const userInput = userInputs[userInputs.length - 1];

    const config = await StudioConfig.findOne({ where: { id: "root" } });
    if (config && config.password === "init")
      await config.update({ password: nanoid() });

    if (config && config.password !== userInput) {
      bot.sendMessage(msg.from.id, "패스워드가 올바르지 않습니다.");
      throw { status: 400, message: "Not Correct Password" };
    } else if (config && config.password === userInput) {
      clientIds.push(msg.from.id);
      bot.sendMessage(
        msg.from.id,
        "어서오세요!\n더이상 알람을 안받고 싶으시면 /stop 명령어를 쳐주세요!"
      );
    } else {
      bot.sendMessage(msg.from.id, "서버 에러!");
      throw { status: 404, message: "NotFound config" };
    }
  } catch (error) {
    return;
  }
};

const onBotListenStop = (msg: any) => {
  clientIds = clientIds.filter((clientId: string) => clientId !== msg.from.id);
};

export const telegramInit = async () => {
  bot.on(["/start", "/hello"], (msg) =>
    msg.reply.text("Welcome To AlpoxStudioBot!")
  );

  bot.on(`/listen`, onBotPassword);
  bot.on("/stop", onBotListenStop);
  bot.start();

  // test
  schedule.scheduleJob({ tz: Timezone, rule: "0 */30 * * * *" }, () => {
    if (clientIds.length === 0) return;

    clientIds.forEach((clientId: string) => {
      bot.sendMessage(clientId, "오늘 예약현황 : 1명\n총 예약현황 : 10명");
    });
  });

  // 하루마다 업데이트
  schedule.scheduleJob({ tz: Timezone, rule: "0 0 0 */1 * *" }, async () => {
    try {
      const config = await StudioConfig.findOne({ where: { id: "root" } });

      if (config) {
        await config.update({ password: nanoid() });
      }
    } catch (error) {}
  });
};
