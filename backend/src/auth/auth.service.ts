
import { ForbiddenException, Injectable, Req, Res } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { User } from '../domain/user';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { User } from '../domain/user';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async login(@Req() _req: any, @Res() _res: any): Promise<any> {
    var user = await this.findUser(_req.user.id);
    // if(user.two_FA_enabled)
    // {
    // 	return _res.redirect(`http://${serv_ip}:3000/auth?2fa=` + String(_req.user.id));
    // }
    return this.sign_42_jwt_token(user.id, _res);
  }

  async sign_42_jwt_token(user_id: number, res: any, is_two_FAed = false) {
    const user = await this.findUser(user_id);
    const payload = { name: user.name, sub: user.id, is_two_FAed: is_two_FAed };
    const token = this.jwtService.sign(payload, {
      secret: this.config.get('our_JWT_secret'),
    });
    res.cookie('accessToken', token);
    res.cookie('id', payload.sub);
    res.redirect(`http://localhost:4200/chat`);
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
}
