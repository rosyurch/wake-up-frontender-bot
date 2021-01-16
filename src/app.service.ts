import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOk(query: any, body: any): { status: string } {
    console.log(query, body);

    return { status: 'ok' };
  }
}
