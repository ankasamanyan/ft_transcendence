
import { Injectable, Req, Res } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { UsersService } from '../service/users.service';
import {User} from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private usersService: UsersService,
  ) {}

  async login(@Req() _req: any, @Res() _res: any): Promise<any> {
    var user = await this.findUser(_req.user.id);
    if(user.tfa_enabled)
    {
      console.log("redirecthaha")
    	return _res.redirect(`http://localhost:4200/2-fa?2fa=` + String(_req.user.id));
    }
    // let result = this.sign_42_jwt_token(user.id, _res)
    return this.sign_42_jwt_token(user.id, _res);
    // res.redirect(`http://localhost:4200/chat`);
  }

  async sign_42_jwt_token(user_id: number, res: any, is_two_FAed = false) {
    const user = await this.findUser(user_id);
    const payload = { name: user.name, sub: user.id, is_two_FAed: is_two_FAed };
    const token = this.jwtService.sign(payload, {
      secret: this.config.get('our_JWT_secret'),
    });
    res.cookie('id', payload.sub);
    res.cookie('accessToken', token);
    res.redirect(`http://localhost:4200/chat`);
  }

  async sign_jwt_token(user_id: number, res: any, is_two_FAed = false) {
    const user = await this.findUser(user_id);
    const payload = { name: user.name, sub: user.id, is_two_FAed: is_two_FAed };
    const token = this.jwtService.sign(payload, {
      secret: this.config.get('our_JWT_secret'),
    });
    res.cookie('accessToken', token);
    res.cookie('id', payload.sub);
    return {accessToken: token};
  }

  async findUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async validate_user(payload: any): Promise<any> {
    const id = payload.sub;

    try {
      const user = await this.findUser(id);
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      return null;
    }
  }

  async generate_secret(user: User) {
    const p_user = await this.prisma.user.findUnique({
      where: { id: user.id },
    });
    if (p_user.tfa_secret) {
      const otpauthUrl = authenticator.keyuri(
        user.email,
        'HerTranscendence',
        p_user.tfa_secret,
      );
      return otpauthUrl;
    } else {
      const secret = authenticator.generateSecret();
      await this.prisma.user.updateMany({
        where: { id: user.id },
        data: { tfa_secret: secret },
      });

      const otpauthUrl = authenticator.keyuri(
        user.email,
        'HerTranscendence',
        secret,
      );
      return otpauthUrl;
    }
  }

  async pipeQrCodeStream(otpauthUrl: string) {
    const dataUrl = await toDataURL(otpauthUrl);
    return { qrCode: dataUrl};
  }

  async verifyCode(user_id: number, code: string): Promise<any> {
    const user = await this.findUser(user_id);
    return authenticator.verify({
      token: code,
      secret: user.tfa_secret,
    });
  }
  async turn_on(user_id: number) {
    const user = await this.findUser(user_id);
    if (!user) {
      return ;
    }
    if (!user.tfa_enabled) {
      await this.prisma.user.update({
        where: { id: user_id },
        data: { tfa_enabled: true },
      });
    }
    // this.userService.turn_on_2FA(user_id);
  }

  async turn_off_2fa(user_id: number) {
    const user = await this.findUser(user_id);
    if (!user) {
      return ;
    }
    if (user.tfa_enabled) {
      await this.prisma.user.update({
        where: { id: user_id },
        data: { tfa_enabled: false },
      });
    }
    // this.userService.turn_on_2FA(user_id);
  }
}
