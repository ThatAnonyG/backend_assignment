import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'argon2';

import { PrismaService } from '../../db/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: Omit<User, 'id'>) {
    return await this.prisma.user.create({
      data: { ...user, password: await hash(user.password) },
    });
  }

  async getUser(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }
}
