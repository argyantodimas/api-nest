import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('set')
  async setValue(@Body() data: { key: string; value: string; exp: number }) {
    const result = await this.redisService.set(data.key, data.value, data.exp);

    if (result === 'OK') return { status: 'success' };

    throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
  }

  @Get('get')
  async getValue(@Query('key') key: string) {
    const data = await this.redisService.get(key);

    if (!data) throw new HttpException('Data Not Found', HttpStatus.GONE);

    return { data };
  }
}
