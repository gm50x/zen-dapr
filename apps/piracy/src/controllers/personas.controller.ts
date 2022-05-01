import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePirate } from '../models';
import { AppService } from '../services';

@Controller('personas')
@ApiTags('Personas')
export class PersonasController {
  constructor(private readonly service: AppService) {}

  @Post()
  async create(@Body() dto: CreatePirate) {
    const { name } = dto;
    return this.service.createPersona(name);
  }

  @Get()
  async list() {
    return this.service.listPersonas();
  }
}
