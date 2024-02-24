import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FTAuthGuard } from './guards/auth.42.guard';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWTAuthGuard } from './guards/auth.jwt.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('our_JWT_secret'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FTAuthGuard, JWTAuthGuard],
})
export class AuthModule {}
