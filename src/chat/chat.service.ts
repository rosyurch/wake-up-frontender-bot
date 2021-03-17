import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { SendMessage } from 'telegram-typings';
import { Repository } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { tgApi } from '../helpers/apiCall';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly ChatRepository: Repository<ChatEntity>,

    private readonly httpService: HttpService,
  ) {}

  addChat(chat: ChatEntity): void {
    console.log('from chat service', chat);

    this.ChatRepository.save(chat);
  }

  async setActivity(id: number, isActive: boolean): Promise<void> {
    this.ChatRepository.update({ id }, { isActive });
  }

  async sendMessageToChat({ text, chat_id }: SendMessage): Promise<void> {
    const sendMessage = tgApi('sendMessage');

    this.httpService.post(sendMessage, { text, chat_id });
  }

  async findById(id: number): Promise<ChatEntity | undefined> {
    return this.ChatRepository.findOne({ id });
  }

  async getAllActiveChatIds(): Promise<ChatEntity[]> {
    return this.ChatRepository.find({
      select: ['id'],
      where: { isActive: true },
    });
  }
}
