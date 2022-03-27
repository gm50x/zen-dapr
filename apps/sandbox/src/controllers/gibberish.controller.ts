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
import { CreateGibberishInput, UPdateGibberishInput } from '../models';
import { GibberishService } from '../services';

@Controller('gibberish')
@ApiTags('Gibberish')
export class GibberishController {
  constructor(private readonly service: GibberishService) {}

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
  updateGibberish(@Param('id') id: string, @Body() data: UPdateGibberishInput) {
    return this.service.create(data);
  }

  @Delete(':id')
  deleteGibberish(@Param('id') id: string) {
    return this.service.delete({ id });
  }
}
