import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
// @ts-ignore
// import { Strategy } from 'passport-42';
import { Strategy, Profile } from 'passport-42';
import { AuthService } from './auth.service';
import { PrismaService } from '../service/prisma.service';

@Injectable()
export class FTStrategy extends PassportStrategy(Strategy, '42') {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
    private prisma: PrismaService,
  ) {
    super({
      clientID: config.get('42_UID'),
      clientSecret: config.get('42_SECRET'),
      callbackURL: config.get('42_CALLBACK_URI'),
      Scope: ['profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('i am in validate 42 strategy');
    let user = await this.prisma.user.findFirst({
      where: {
        name: profile.username,
      },
    });
    if (!user) {
      await this.prisma.user.create({
        data: {
          // email: user.email,
          name: user.name,
          intra_login: user.intra_login,
          // hash: hash,
          picture: user.picture,
          // isAuthenticated: false,
        },
      });
      user = await this.authService.findUser(profile.emails[0].value);
    }
    return user || null;
  }
}
