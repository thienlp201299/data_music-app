import { Module } from '@nestjs/common';
import { SingerService } from './singer.service';
import { SingerController } from './singer.controller';

@Module({
  providers: [SingerService],
  controllers: [SingerController]
})
export class SingerModule {}
