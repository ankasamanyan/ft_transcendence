import {Injectable} from '@nestjs/common';
import {User, Users} from "../domain/user";
import {from} from "rxjs";
import { PrismaGameInvitationRepository } from 'src/adapter/repository/prisma-game-invitation-repository';

@Injectable()
export class GameService {
	constructor(private prismaGameInvitationRepository: PrismaGameInvitationRepository) {}

	invite(users: Users) {
		return from(this.prismaGameInvitationRepository.invite(users));
	}

	deleteOrDecline(users: Users) {
		return from(this.prismaGameInvitationRepository.deleteOrDecline(users));
	}

	getInvitations(userId: number) {
		return from(this.prismaGameInvitationRepository.getInvitations(userId));
	}

	getFutureMatches(userId: number) {
		return from(this.prismaGameInvitationRepository.getFutureMatches(userId));
	}

	accept(users: Users) {
		return from(this.prismaGameInvitationRepository.accept(users));
	}

	getAllFutureMatches() {
		return from(this.prismaGameInvitationRepository.getAllFutureMatches());
	}

	getNextMatch() {
		return from(this.prismaGameInvitationRepository.getNextMatch());
	}
}