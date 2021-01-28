import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatEntity } from './chat/chat.entity';
import { ChatModule } from './chat/chat.module';
import { Phrase } from './phrase/phrase.entity';
import { PhraseModule } from './phrase/phrase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({ timeout: 30000 }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      entities: [ChatEntity, Phrase],
      synchronize: true,
      logging: true,
    }),
    ChatModule,
    ScheduleModule.forRoot(),
    PhraseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
