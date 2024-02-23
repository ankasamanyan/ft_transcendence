import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {UserResponse, UsersResponse} from "../dto/users-response";
import {User} from "../../domain/user";
import {ChannelUpdate} from "src/domain/channel-update";

interface RawSql {
  id: number,
  name: string,
  intra_login: string,
  picture: string,
  email: string,
  is_authenticated: boolean
}

@Injectable()
export class PrismaBannedUsersRepository {
  constructor(private prisma: PrismaService) {

  }

  async banUser(bannedUser: User, channelId: number) {
    await this.prisma.bannedUser.create({
      data: {
        channel_id: Number(channelId),
        user_id: Number(bannedUser.id),
      }
    });
  }

  async banUsers(channelUpdate: ChannelUpdate) {
    const userIds = channelUpdate.users.map(user => user.id);
    // kick the users
    await this.prisma.channelParticipant.deleteMany({
      where: {
        channel_id: Number(channelUpdate.channelId),
        user_id: {
          in: userIds
        }
      }
    });
    //ban the users
    const bannedUsersData = userIds.map(userId => ({
      channel_id: Number(channelUpdate.channelId),
      user_id: userId
    }));

    await this.prisma.bannedUser.createMany({
      data: bannedUsersData
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

  async isBanned(channelUpdate: ChannelUpdate) {
    const isBanned = await this.prisma.bannedUser.findFirst({
      where: {
        channel_id: Number(channelUpdate.channelId),
        user_id: Number(channelUpdate.users[0].id)
      }
    });
    return isBanned !== null;
  }

  async getBannedUsers(channelId: number) {
    const channelIdasInt = Number(channelId);
    const bannedUsers = await this.prisma.$queryRaw<RawSql[]>`
        SELECT b."user_id"        as id,
               u.name             as name,
               u.intra_login      as intra_login,
               u.picture          as picture,
               u.email            as email,
               u.is_authenticated as is_authenticated
        from "BannedUser" b
                 LEFT JOIN "User" u on b."user_id" = u.id
        where b."channel_id" = ${channelIdasInt}`
    return new UsersResponse(bannedUsers.map((user) => {
      return new UserResponse(
        user.id,
        user.name,
        user.intra_login,
        user.picture,
        user.email,
        user.is_authenticated);
    }));
  }

}