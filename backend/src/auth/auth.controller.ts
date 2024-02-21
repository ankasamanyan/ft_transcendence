import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FTAuthGuard } from './guards/auth.42.guard';

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
    // here you now create your own tokens with jwt sign
    // return { msg: req.user.username + ' You have successfully logged in' };
  }
}
