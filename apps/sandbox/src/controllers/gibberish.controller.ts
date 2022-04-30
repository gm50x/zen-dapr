import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGibberishInput, UpdateGibberishInput } from '../models';
import { GibberishService } from '../services';

@Controller('gibberish')
@ApiTags('Gibberish')
export class GibberishController {
  constructor(private readonly service: GibberishService) {}

  @Get('generic')
  getFromGeneric() {
    return this.service.getFromGeneric();
  }

  @Get()
  getManyGibberish() {
    return this.service.getMany();
  }

  @Post()
  createGibberish(@Body() data: CreateGibberishInput) {
    return this.service.create(data);
  }

  @Get(':id')
  getGibberishById(@Param('id') id: string) {
    return this.service.get({ id });
  }

  @Put(':id')
  updateGibberish(@Param('id') id: string, @Body() data: UpdateGibberishInput) {
    return this.service.create(data);
  }

  @Delete(':id')
  deleteGibberish(@Param('id') id: string) {
    return this.service.delete({ id });
  }
}
