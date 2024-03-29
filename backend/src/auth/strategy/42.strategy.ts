import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
// @ts-ignore
// import { Strategy } from 'passport-42';
import { Strategy, Profile } from 'passport-42';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../service/prisma.service';
import { User } from '@prisma/client';
import { PrismaUsersRepository } from 'src/adapter/repository/prisma-users-repository';



@Injectable()
export class FTStrategy extends PassportStrategy(Strategy, '42') {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
    private prisma: PrismaService,
    private prismaUsersRepository: PrismaUsersRepository,
  ) {
    super({
      clientID: config.get('42_UID'),
      clientSecret: config.get('42_SECRET'),
      callbackURL: config.get('42_CALLBACK_URI'),
      Scope: ['profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<User> {
    const pictureIndex = Math.floor(Math.random() * 7);
    let user = await this.prisma.user.findUnique({
      where: {
        id: Number(profile.id),
      },
    });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          name: profile.displayName,
          id: Number(profile.id),
          intra_login: profile.username,
          picture: `assets/defaultAvatar${pictureIndex}.jpeg`
        },

      });
      let stats = await this.prisma.userStatistics.findUnique({
        where: {
          userId: Number(profile.id),
        },
      });
      if(!stats) {
        await this.prisma.userStatistics.create({
          data: {
            userId:Number(profile.id),
            wins: 0,
            losses: 0,
          },

        });
      }

    }
    return user;
  }
}
