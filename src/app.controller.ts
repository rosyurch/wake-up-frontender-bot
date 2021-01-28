import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Update } from 'telegram-typings';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getOk(@Body() updateBody: Update) {
    const { message } = updateBody;

    if (message) {
      const { text = 'received', chat } = message;

      console.log(updateBody);

      return this.appService.processCommand({ text, chat });
    }

    return HttpStatus.OK;
  }
}
