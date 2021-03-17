import { HttpService, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import type { Chat } from 'telegram-typings';
import { ChatService } from './chat/chat.service';
import { tgApi } from './helpers/apiCall';
import { PhraseService } from './phrase/phrase.service';

@Injectable()
export class AppService {
  constructor(
    private readonly http: HttpService,
    private readonly chatService: ChatService,
    private readonly phraseService: PhraseService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_7AM, { utcOffset: 0 })
  async greet(): Promise<void> {
    const todaysMessage = await this.phraseService.getRandomPhrase('en');

    if (!todaysMessage) return;

    this.sendMessageToAllChats(todaysMessage);
  }

  async processCommand({
    text,
    chat,
  }: {
    text: string;
    chat: Chat;
  }): Promise<void> {
    const { id } = chat;
    if (text === '/start') {
      const existingChat = await this.chatService.findById(id);

      if (existingChat) {
        this.chatService.setActivity(id, true);
        return;
      }

      this.chatService.addChat({ ...chat, isActive: true });
      return;
    } else if (text === '/stop') {
      this.chatService.setActivity(id, false);
      return;
    }

    // for lang | time commands return keyboardss
    // return { chat_id: id, text, method: 'sendMessage' };
  }

  async sendMessageToAllChats(text: string): Promise<void> {
    const chatIds = await this.chatService.getAllActiveChatIds();

    for (const chat of chatIds) {
      const { id } = chat;
      await this.sendMessageToOneChat(text, id);
    }
  }

  async sendMessageToOneChat(text: string, id: number) {
    const sendMessageEndpoint = tgApi('sendMessage');

    const successMessage = this.http.post(sendMessageEndpoint, {
      text,
      chat_id: id,
    });
    // from axios observable
    const res = await successMessage.toPromise();

    return res;
  }
}
