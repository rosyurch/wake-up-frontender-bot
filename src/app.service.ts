import { HttpService, Injectable } from '@nestjs/common';
import { SendMessage } from 'telegram-typings';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  sendMessage({ chat_id, text }: SendMessage) {
    return { chat_id, text, method: 'sendMessage' };
  }
}
