import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post('users')
  async createUser(@Body() data: User) {
    this.appService.createUser(data);
  }

  @Get('users')
  async getUsers() {
    return this.appService.getUsers();
  }

  @Post('foo')
  async postFoo(@Body() data: any): Promise<any> {
    console.log('triggered', data);

    return;
  }
}
