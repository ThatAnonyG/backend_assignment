import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
import { AuthService } from '../../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() user: CreateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    const res = await this.userService.createUser(user);
    return {
      id: res.id,
      full_name: res.full_name,
      email: res.email,
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Request() req: { user: User }) {
    return this.authService.sendAccessToken({
      id: req.user.id,
      email: req.user.email,
    });
  }
}
