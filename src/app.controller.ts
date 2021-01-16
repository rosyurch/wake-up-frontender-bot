import { Body, Controller, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getOk(@Query() query: any, @Body() body: any) {
    return this.appService.getOk(query, body);
  }
}
