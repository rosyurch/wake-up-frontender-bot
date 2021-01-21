import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SendMessage } from 'telegram-typings';
import { Repository } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { tgApi } from '../helpers/apiCall';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private ChatRepository: Repository<ChatEntity>,

    private httpService: HttpService,
  ) {}

  addChat(chat: ChatEntity) {
    this.ChatRepository.save(chat);
  }

  async deactivateChat(id: number) {
    this.ChatRepository.update({ id }, { isActive: false });
  }

  async sendMessageToChat({ text, chat_id }: SendMessage) {
    const sendMessage = tgApi('sendMessage');

    this.httpService.post(sendMessage, { text, chat_id });
  }
}
