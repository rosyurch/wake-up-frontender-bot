import { HttpService, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Chat } from 'telegram-typings';
import { ChatService } from './chat/chat.service';
import { tgApi } from './helpers/apiCall';
import { PhraseService } from './phrase/phrase.service';
// Wake up, frontender! Time to add spaghetti policy header
@Injectable()
export class AppService {
  constructor(
    private http: HttpService,
    private chatService: ChatService,
    private phraseService: PhraseService,
  ) {}

  // @Cron(CronExpression.EVERY_DAY_AT_9AM, { utcOffset: 0 })
  async greet() {
    const todaysMessage = await this.phraseService.getRandomPhrase('en');

    if (!todaysMessage) return;

    this.sendMessageToAllChats(todaysMessage);
  }

  async processCommand({ text, chat }: { text: string; chat: Chat }) {
    const { id } = chat;
    if (text === '/start') {
      const existingChat = await this.chatService.findById(id);

      if (existingChat) {
        this.chatService.setActivity(id, true);
        return;
      }

      this.chatService.addChat({ ...chat, isActive: true });
      return;
    }
    // for lang | time commands return keyboardss
    // return { chat_id: id, text, method: 'sendMessage' };
  }

  async sendMessageToAllChats(text: string) {
    const chatIds = await this.chatService.getAllChatIds();
    console.log(chatIds);

    for (const chat of chatIds) {
      const { id } = chat;
      await this.sendMessageToOneChat(text, id);
    }
  }

  async sendMessageToOneChat(text: string, id: number) {
    const sendMessageEndpoint = tgApi('sendMessage');
    console.log(sendMessageEndpoint);

    const successMessage = this.http.post(sendMessageEndpoint, {
      text: 'argh',
      chat_id: id,
    });
    // from axios observable
    const res = await successMessage.toPromise();

    return res;
  }
}
