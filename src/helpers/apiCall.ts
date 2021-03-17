export const tgApi = (apiMethod: string): string =>
  `https://api.telegram.org/bot${process.env.BOT_KEY ?? ''}/${apiMethod}`;
