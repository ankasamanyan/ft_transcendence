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
export class PrismaBannedUsersRepository{
	constructor(private prisma: PrismaService) {

	}

	async banUser(bannedUser: User, channelId: number) {
        await this.prisma.bannedUser.create({
            data: {
                channel_id: channelId,
                user_id: bannedUser.id,
            }
        });
    }

    async unbanUser(channelId: number, bannedUserId: number) {
            await this.prisma.bannedUser.deleteMany({
              where: {
                  channel_id: Number(channelId),
				  user_id: Number(bannedUserId),
              }
         });
    }

	async getBannedUsers(channelId: number) {
		const channelIdasInt = Number(channelId);
		const bannedUsers = await this.prisma.$queryRaw<RawSql[]>`
			SELECT b."user_id" as id,
				u.name as name,
				u.intra_login as intra_login,
                u.picture as picture
			from "BannedUser" b
				LEFT JOIN "User" u on b."user_id" = u.id
			where b."channel_id" = ${channelIdasInt}`
		return new UsersResponse(bannedUsers.map((user) => {
			return new UserResponse(
				user.id,
                user.name,
                user.intra_login,
                user.picture);
		}));
	}
}