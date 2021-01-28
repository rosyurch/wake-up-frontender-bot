import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity]), HttpModule],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
