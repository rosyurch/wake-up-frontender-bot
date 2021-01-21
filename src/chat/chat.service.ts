import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'telegram-typings';
import { Repository } from 'typeorm';
import { ChatEntity } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private ChatRepository: Repository<ChatEntity>,
  ) {}

  async addChat(chat: ChatEntity) {}

  async deactivateChat(id: Pick<ChatEntity, 'id'>) {}

  async sendMessageToChat(message: Message) {}
}
