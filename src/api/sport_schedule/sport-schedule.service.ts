import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateSportScheduleDTO } from './sport-schedule.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class SportScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async createSportSchedule(
    { name, date, ...data }: CreateSportScheduleDTO,
    user_id: number,
  ) {
    // For consistency all the dates are stored as UTC
    const start_time = moment(`${date} ${data.start_time}`).utc();
    const end_time = moment(`${date} ${data.end_time}`).utc();

    const previousSchedule = (
      await this.prisma.sportSchedule.findMany({
        where: {
          user_id,
        },
      })
    ).map((x) => {
      return {
        ...x,
        start_time: moment(x.start_time).utc().format('HH:mm:ss'),
        end_time: moment(x.end_time).utc().format('HH:mm:ss'),
        date: moment(x.date).utc().format('YYYY-MM-DD'),
      };
    });

    // Event start should not overlap with any other event
    if (
      previousSchedule.filter((x) =>
        start_time.isBetween(
          moment(`${x.date} ${x.start_time}`).utc(true),
          moment(`${x.date} ${x.end_time}`).utc(true),
          null,
          '[]',
        ),
      ).length > 0
    )
      throw new BadRequestException(
        'New sport schedule overlaps with previously set schedule',
      );

    const adjustedEndTime = previousSchedule.find((x) =>
      end_time.isBetween(
        moment(`${x.date} ${x.start_time}`).utc(true),
        moment(`${x.date} ${x.end_time}`).utc(true),
        null,
        '[]',
      ),
    )?.end_time;

    const schedule = await this.prisma.sportSchedule.create({
      data: {
        name,
        date: start_time.toDate(),
        start_time: start_time.toDate(),
        end_time: (adjustedEndTime
          ? moment(`${date} ${adjustedEndTime}`).utc(true)
          : end_time
        ).toDate(),
        user_id,
      },
    });

    return {
      id: schedule.id,
      name: schedule.name,
      user_id: schedule.user_id,
      date: moment(schedule.date).utc().format('YYYY-MM-DD'),
      utcStartDate: moment(schedule.start_time).utc().format('HH:mm:ss'),
      utcEndDate: moment(schedule.end_time).utc().format('HH:mm:ss'),
    };
  }
}
