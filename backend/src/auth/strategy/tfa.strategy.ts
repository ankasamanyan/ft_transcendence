import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

export type JwtPayload = {
  name: string;
  sub: string | number;
  mail: string;
  is_two_FAed: boolean;
};

@Injectable()
export class TfaStrategy extends PassportStrategy(Strategy, 'Two-FA') {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,									// after testing enable again (disabled because testuser token hardcoded)
      secretOrKey: configService.get('secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {

    const user = await this.authService.findUser(Number(payload.sub));
    if (!user.tfa_enabled) {
      return user;
    } else if (payload.is_two_FAed) {
      return user;
    } else {
      ////// ////console.log("2-fa guard validate invalid token");
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
  }
}
