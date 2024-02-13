import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import { UserResponse, UsersResponse } from "../dto/users-response";
import {Users, User} from "../../domain/user";

interface RawSql {
    id: number,
    name: string,
    intra_login: string,
    picture: string
}

@Injectable()
export class PrismaMutedUsersRepository{
	constructor(private prisma: PrismaService) {
	}

	async muteUser(mutedUser: User, channelId: number) {
        await this.prisma.mutedUser.create({
            data: {
                channel_id: Number(channelId),
                user_id: Number(mutedUser.id),
            }
        });
    }

	async unmuteUser(channelId: number, mutedUserId: number ) {
		await this.prisma.mutedUser.deleteMany({
		  where: {
			  channel_id: Number(channelId),
			  user_id: Number(mutedUserId),
		  }
	    });
	}

	async getMutedUsers(channelId: number) {
		const channelIdasInt = Number(channelId);
		const mutedUsers = await this.prisma.$queryRaw<RawSql[]>`
			SELECT m."user_id" as id,
				u.name as name,
				u.intra_login as intra_login,
                u.picture as picture
			from "MutedUser" m
				LEFT JOIN "User" u on m."user_id" = u.id
			where b."channel_id" = ${channelIdasInt}`
		return new UsersResponse(mutedUsers.map((user) => {
			return new UserResponse(
				user.id,
                user.name,
                user.intra_login,
                user.picture);
		}));
	}
}