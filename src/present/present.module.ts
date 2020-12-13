import { Module } from '@nestjs/common';
import { PresentService } from './present.service';
import { PresentController } from './present.controller';

@Module({
  providers: [PresentService],
  controllers: [PresentController]
})
export class PresentModule {}
