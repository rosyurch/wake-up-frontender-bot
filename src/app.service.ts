import { HttpService, Injectable } from '@nestjs/common';
import { SendMessage } from 'telegram-typings';

const tgApi = (apiMethod: string) =>
  `https://api.telegram.org/bot${process.env.BOT_KEY}/${apiMethod}`;

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  sendMessage({ chat_id, text }: SendMessage) {
    return { chat_id, text, method: 'sendMessage' };
    // return this.httpService.post(tgApi('sendMessage'), { text, chat_id });
  }
}
