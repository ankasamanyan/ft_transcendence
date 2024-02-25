import {Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FTAuthGuard } from './guards/auth.42.guard';
import {JWTAuthGuard} from "./guards/auth.jwt.guard";
import {TwoFactorCode} from "../domain/two-factor-code";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(FTAuthGuard)
  @Get('42')
  auth42() {}

  @UseGuards(FTAuthGuard)
  @Get('42-redirect')
  async login(@Req() req: any, @Res() res: any): Promise<any>{
    this.authService.login(req, res);
    // res.redirect(`http://localhost:4200/chat`);
    // here you now create your own tokens with jwt sign
    // return { msg: req.user.username + ' You have successfully logged in' };
  }

  @UseGuards(JWTAuthGuard)
  @Get('generateQRCode')
  async generateQrCode(@Req() req: any): Promise<any> {
    const otpauthUrl = await this.authService.generate_secret(req.user);
    return this.authService.pipeQrCodeStream(otpauthUrl);
  }

  @Post('ResultFromQrCode')
  @UseGuards(JWTAuthGuard)
  async	turn_on_2fa(@Req() req: any, @Body() code : TwoFactorCode, @Res({passthrough: true}) res: any)  {
    console.log("result from qr code -", code.code);
    const valid_code = await this.authService.verifyCode(req.user.id, code.code);
    if(!valid_code) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.authService.turn_on(req.user.id);
    return this.authService.sign_jwt_token(req.user.id, res, true);
  }
}

