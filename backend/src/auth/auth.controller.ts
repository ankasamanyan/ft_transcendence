import {Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FTAuthGuard } from './guards/auth.42.guard';
import {JWTAuthGuard} from "./guards/auth.jwt.guard";

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
  async	turn_on_2fa(@Req() req: any, @Body('two_FA_code') code : string, @Res({passthrough: true}) res: any) : Promise<any>
  {
    console.log("result from qr code ");
    console.log(code);
    const valid_code = await this.authService.verifyCode(req.user.id, code);
    // console.log("log 1 ");
    if(!valid_code)
    {
      // console.log("log 2 ");
      throw new UnauthorizedException('Wrong authentication code');
    }
    // console.log("log 3 ");
    await this.authService.turn_on(req.user.id);
    return this.authService.sign_jwt_token(req.user.id, res, true);
  }
}

