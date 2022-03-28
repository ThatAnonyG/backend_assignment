import { IsNotEmpty } from 'class-validator';

export class CreateSportScheduleDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  date: string;
  @IsNotEmpty()
  start_time: string;
  @IsNotEmpty()
  end_time: string;
}
