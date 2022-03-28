import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSportScheduleDTO } from './sport-schedule.dto';

import { SportScheduleService } from './sport-schedule.service';

@Controller('sport_schedule')
export class SportScheduleController {
  constructor(private readonly sportScheduleService: SportScheduleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createSportSchedule(
    @Body() scheduleData: CreateSportScheduleDTO,
    @Req() req: { user: { id: number } },
  ) {
    return await this.sportScheduleService.createSportSchedule(
      scheduleData,
      req.user.id,
    );
  }
}
