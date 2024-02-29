import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersRequest } from './dto/users-request';
import { GameService } from 'src/service/game-service';

import { PrismaGameRepository } from './repository/prisma-game-repository';
import { JWTAuthGuard } from 'src/auth/guards/auth.jwt.guard';


@Controller('/game')
export class GameController {
  constructor(private gameService: GameService,
    private prismaGameRepository: PrismaGameRepository
    ) {}
    
  @UseGuards(JWTAuthGuard)
  @Post('/invite')
  invite(@Body() request: UsersRequest) {
    return this.gameService.invite(UsersRequest.toDomain(request));
  }
  
  
  @UseGuards(JWTAuthGuard)
  @Delete('/invite/delete')
  deleteOrDecline(@Body() request: UsersRequest) {
    return this.gameService.deleteOrDecline(UsersRequest.toDomain(request));
  }
  
  @UseGuards(JWTAuthGuard)
  @Get('/invitations/:recipientId')
  getInvitations(@Param('recipientId') recipientId: number) {
    return this.gameService.getInvitations(recipientId);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/invitations/exists/:initiatorId/:recipientId/')
  isInvitationAlreadySent(
    @Param('initiatorId') initiatorId: number,
    @Param('recipientId') recipientId: number,
  ) {
    return this.gameService.isInvitationAlreadySent(initiatorId, recipientId);
  }

  @UseGuards(JWTAuthGuard)
  @Put('/invite/accept')
  accept(@Body() request: UsersRequest) {
    return this.gameService.accept(UsersRequest.toDomain(request));
  }

  @UseGuards(JWTAuthGuard)
  @Get('/history/:userId')
  getMatchHistory(@Param('userId') userId: number) {
      return this.prismaGameRepository.matchHistory(userId);
  }
}

