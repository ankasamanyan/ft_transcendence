import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import { Users, User } from "src/domain/user";
import { UserResponse, UsersResponse } from "../dto/users-response";
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
	async deleteOrDecline(users: Users) {
		await this.prisma.gameInvitation.deleteMany({
			where: {
				initiatorId: Number(users.users[0].id),
				recipientId: Number(users.users[1].id)
			}
		})
	}

	async getInvitations(userId: number) {
		const invitations = await this.prisma.gameInvitation.findMany({
			where: {
				recipientId: Number(userId),
				status: 'pending'
			},
			select: { initiatorId: true }
		});
		const initiatorIds = invitations.map(invitation => invitation.initiatorId);
		const iniatators = await this.prisma.user.findMany({
			where: {
				id: {in: initiatorIds}
			}
		});
		return new UsersResponse(iniatators.map((user) => {
			return new UserResponse(
			  user.id,
			  user.name,
			  user.intra_login,
			  user.picture,
			  user.email,
			  user.is_authenticated,
				user.tfa_enabled,
				user.tfa_secret);
		  }));	
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

	async accept(users: Users) {
		await this.prisma.gameInvitation.updateMany({
			where: {
				initiatorId: Number(users.users[0].id),
				recipientId: Number(users.users[1].id)
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

	async isInvitationAlreadySent(initiatorId: number, recipientId: number) {
		const invitation = await this.prisma.gameInvitation.findFirst({
			where: {
				OR: [
          {
            initiatorId: Number(initiatorId),
            recipientId: Number(recipientId),
          },
					{initiatorId: Number(recipientId), recipientId: Number(initiatorId)}
				]
			}
		})
		return !!invitation;
	}
}