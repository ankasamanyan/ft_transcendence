import {Injectable} from '@nestjs/common';
import {User, Users} from "../domain/user";
import {from} from "rxjs";
import { PrismaGameInvitationRepository } from 'src/adapter/repository/prisma-game-invitation-repository';

class GameRequestDto {
    constructor(
      public gameId:number,
      public userId:number,
      public paddleMove:number,
    ){}
  }

class GameResponsetDto {
    constructor(
      public gameId:number,
      public paddleLeft:number,
      public paddleRight:number,
    ){}
  }


@Injectable()
export class GameService {

	constructor(private prismaGameInvitationRepository: PrismaGameInvitationRepository) {}

	invite(users: Users) {
		return from(this.prismaGameInvitationRepository.invite(users));
	}

	deleteOrDecline(invitationId: number) {
		return from(this.prismaGameInvitationRepository.deleteOrDecline(invitationId));
	}

	getInvitations(userId: number) {
		return from(this.prismaGameInvitationRepository.getInvitations(userId));
	}

	getFutureMatches(userId: number) {
		return from(this.prismaGameInvitationRepository.getFutureMatches(userId));
	}

	accept(invitationId: number) {
		return from(this.prismaGameInvitationRepository.accept(invitationId));
	}

	getAllFutureMatches() {
		return from(this.prismaGameInvitationRepository.getAllFutureMatches());
	}

	getNextMatch() {
		return from(this.prismaGameInvitationRepository.getNextMatch());
	}

	async updatePaddle(gameRequestDto: GameRequestDto): Promise<GameResponsetDto> {
        console.log("The time has come");
        return new GameResponsetDto(1,100,200);
    }
}