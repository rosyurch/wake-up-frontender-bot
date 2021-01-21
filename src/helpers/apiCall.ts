export const tgApi = (apiMethod: string) =>
  `https://api.telegram.org/bot${process.env.BOT_KEY}/${apiMethod}`;
