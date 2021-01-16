import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule.register({ timeout: 30000 })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
