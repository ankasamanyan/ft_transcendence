import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from '../../service/game.service';
import { PrismaService } from 'src/service/prisma.service';

@Module({
    providers: [
      GameGateway,
      PrismaService,
      GameService,
       ]
  })
  export class ChatGatewayModule {
  }
  