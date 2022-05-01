import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePirate } from '../models';
import { AppService } from '../services';

@Controller('ships')
@ApiTags('Ships')
export class ShipsController {
  constructor(private readonly service: AppService) {}

  @Post()
  async create(@Body() dto: CreatePirate) {
    const { name } = dto;
    return this.service.createShip(name);
  }

  @Get()
  async list() {
    return this.service.listShips();
  }
}
