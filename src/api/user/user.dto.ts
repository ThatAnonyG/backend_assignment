import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  full_name: string;
  @IsNotEmpty()
  password: string;
}

export class UserLoginDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
