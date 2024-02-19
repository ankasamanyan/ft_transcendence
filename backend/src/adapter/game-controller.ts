import {Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';
import { UsersRequest} from "./dto/users-request";
import { GameService } from 'src/service/game-service';

@Controller('/game')
export class GameController {
	constructor(private gameService: GameService) {}

	@Post('/invite')
	invite(@Body() request: UsersRequest) {
		return this.gameService.invite(UsersRequest.toDomain(request));
	}

	@Delete('/invite/:invitationId')
	deleteOrDecline(@Param('invitationId') invitationId: number) {
		return this.gameService.deleteOrDecline(invitationId);
	}

	@Get('/invitations/:recipientId')
	getInvitations(@Param('recipientId') recipientId: number) {
		return this.gameService.getInvitations(recipientId);
	}

	@Get('/future-matches/:userId')
	getFutureMatches(@Param('userId') userId: number) {
		return this.gameService.getFutureMatches(userId);
	}

	@Put('/invite/:invitationId')
	accept(@Param('invitationId') invitationId: number) {
		return this.gameService.accept(invitationId);
	}

	@Get('/future-matches')
	getAllFutureMatches() {
		return this.gameService.getAllFutureMatches();
	}

	@Get('/next-match')
	getNextMatch() {
		return this.gameService.getNextMatch();
	}
}