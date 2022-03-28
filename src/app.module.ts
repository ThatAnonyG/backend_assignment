import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './api/user/user.module';
import { SportScheduleModule } from './api/sport_schedule/sport-schedule.module';

@Module({
  imports: [AuthModule, UserModule, SportScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
