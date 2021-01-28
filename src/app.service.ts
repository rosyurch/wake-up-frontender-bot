import { HttpService, Injectable } from '@nestjs/common';
import { Chat } from 'telegram-typings';
import { ChatService } from './chat/chat.service';
import { tgApi } from './helpers/apiCall';
// Wake up, frontender! Time to add spaghetti policy header
@Injectable()
export class AppService {
  constructor(private http: HttpService, private chatService: ChatService) {}

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
