import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePirate } from '../models';
import { AppService } from '../services';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post()
  async createPersona(@Body() dto: CreatePirate) {
    const { name } = dto;
    return this.service.createPersona(name);
  }

  @Get()
  async listPersonas() {
    return this.service.listPersonas();
  }
}
