import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { Update } from 'telegram-typings';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('bot')
  async getOk(@Body() updateBody: Update): Promise<void | HttpStatus.OK> {
    const { message } = updateBody;

    if (message) {
      const { text = 'received', chat } = message;

      console.log(updateBody);

      return this.appService.processCommand({ text, chat });
    }

    return HttpStatus.OK;
  }

  @Get('/test')
  chackAlive(): string {
    return "It's alive";
  }
}
