import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import { Users, User } from "src/domain/user";

//status 'pending', 'accepted'
@Injectable()
export class PrismaGameInvitationRepository {
	constructor(private prisma: PrismaService) {}

	//initiator is first user, recipient is second user
	async invite(users: Users) {
		await this.prisma.gameInvitation.create({
			data: {
				initiatorId: Number(users.users[0].id),
				recipientId: users.users[1].id,
				status: 'pending'
			}
		})
	}

	//when match starts or if recipient declines
	async deleteOrDecline(invitationId: number) {
		await this.prisma.gameInvitation.delete({
			where: {
				id: Number(invitationId)
			}
		})
	}

	//returns the matches where the user has been invited
	async getInvitations(userId: number) {
		const invitations = await this.prisma.gameInvitation.findMany({
			where: {
				recipientId: Number(userId),
				status: 'pending'
			}
		})
		return invitations;
	}

	//returns matches waiting for play time
	async getFutureMatches(userId: number) {
		const futureMatches = await this.prisma.gameInvitation.findMany({
			where: {
				recipientId: Number(userId),
				status: 'accepted'
			}
		})
		return futureMatches;
	}

	async accept(invitationId: number) {
		await this.prisma.gameInvitation.update({
			where: {
				id: Number(invitationId)
			},
			data: {
				status: 'accepted'
			}
		})
	}

	async getAllFutureMatches() {
		const futureMatches = await this.prisma.gameInvitation.findMany({
			where: {
				status: 'accepted'
			}
		})
		return futureMatches;
	}

	async getNextMatch() {
		const nextMatch = await this.prisma.gameInvitation.findFirst({
			where: {
				status: 'accepted'
			}
		})
		return nextMatch;
	}
}