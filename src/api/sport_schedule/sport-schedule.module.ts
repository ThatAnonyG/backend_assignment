import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

import { SportScheduleController } from './sport-schedule.controller';
import { SportScheduleService } from './sport-schedule.service';

@Module({
  controllers: [SportScheduleController],
  providers: [PrismaService, SportScheduleService],
})
export class SportScheduleModule {}
