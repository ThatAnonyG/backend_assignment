import { Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../db/prisma.service';
import { UserLoginDTO } from '../api/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginInfo: UserLoginDTO) {
    const user = await this.prisma.user.findFirst({
      where: { email: loginInfo.email },
    });
    if (user && (await verify(user.password, loginInfo.password))) return user;
    return false;
  }

  async sendAccessToken(payload: { id: number; email: string }) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
