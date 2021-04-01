import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getHello(): string {
    console.log('"hello" :>> ', 'hello');
    return 'Hello World';
  }
}
