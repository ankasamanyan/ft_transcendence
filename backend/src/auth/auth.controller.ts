import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {FTAuthGuard} from "../guards/auth.42.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(FTAuthGuard)
  @Get('42')
  auth42() {}

  @UseGuards(FTAuthGuard)
  @Get('42-redirect')
  auth42Redirect(@Req() req) {
    return { msg: req.user.username + ' You have successfully logged in' };
  }
}
