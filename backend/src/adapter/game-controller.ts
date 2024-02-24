import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  // UseGuards,
} from '@nestjs/common';
import { UsersRequest } from './dto/users-request';
import { GameService } from 'src/service/game-service';
// import {JWTAuthGuard} from "../auth/guards/auth.jwt.guard";

@Controller('/game')
export class GameController {
  constructor(private gameService: GameService) {}

  // @UseGuards(JWTAuthGuard)
  @Post('/invite')
  invite(@Body() request: UsersRequest) {
    return this.gameService.invite(UsersRequest.toDomain(request));
  }

  @Delete('/invite/delete')
  deleteOrDecline(@Body() request: UsersRequest) {
    return this.gameService.deleteOrDecline(UsersRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/invitations/:recipientId')
  getInvitations(@Param('recipientId') recipientId: number) {
    return this.gameService.getInvitations(recipientId);
  }

  @Get('/invitations/exists/:initiatorId/:recipientId/')
  isInvitationAlreadySent(
    @Param('initiatorId') initiatorId: number,
    @Param('recipientId') recipientId: number,
  ) {
    return this.gameService.isInvitationAlreadySent(initiatorId, recipientId);
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/future-matches/:userId')
  getFutureMatches(@Param('userId') userId: number) {
    return this.gameService.getFutureMatches(userId);
  }

  @Put('/invite/accept')
  accept(@Body() request: UsersRequest) {
    return this.gameService.accept(UsersRequest.toDomain(request));
  }
  // @UseGuards(JWTAuthGuard)

  @Get('/future-matches')
  getAllFutureMatches() {
    return this.gameService.getAllFutureMatches();
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/next-match')
  getNextMatch() {
    return this.gameService.getNextMatch();
  }
}
