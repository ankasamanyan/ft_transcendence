import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { User } from '../domain/user';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { User } from '../domain/user';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async findUser(intra_login: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        intra_login: intra_login,
      },
    });
    return user;
  }

  async signup(user: User) {

    try {
      await this.prisma.user.create({
        data: {
          // email: user.email,
          name: user.name,
          intra_login: user.intraLogin,
          picture: user.picture,
          // isAuthenticated: false,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'An account with email or username already exists',
          );
        }
      }
    }
  }
}
