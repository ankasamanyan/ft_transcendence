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
  is_authenticated: boolean,
  tfa_enabled: boolean,
}

@Injectable()
export class PrismaMutedUsersRepository {
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

  async muteUsers(channelUpdate: ChannelUpdate) {
    const userIds = channelUpdate.users.map(user => user.id);
    const mutedUsersData = userIds.map(userId => ({
      channel_id: Number(channelUpdate.channelId),
      user_id: userId
    }));

    await this.prisma.mutedUser.createMany({
      data: mutedUsersData
    });
  }

  async unmuteUser(channelId: number, mutedUserId: number) {
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
        SELECT m."user_id"        as id,
               u.name             as name,
               u.intra_login      as intra_login,
               u.picture          as picture,
               u.email            as email,
               u.is_authenticated as is_authenticated,
               u.tfa_enabled      as tfa_enabled
        from "MutedUser" m
                 LEFT JOIN "User" u on m."user_id" = u.id
        where b."channel_id" = ${channelIdasInt}`
    return new UsersResponse(mutedUsers.map((user) => {
      return new UserResponse(
        user.id,
        user.name,
        user.intra_login,
        user.picture,
        user.email,
        user.is_authenticated,
          user.tfa_enabled);
    }));
  }

  async isMuted(channelId: number, userId: number) {
    const mutedUser = await this.prisma.mutedUser.findFirst({
      where: {
        channel_id: Number(channelId),
        user_id: Number(userId)
      },
    });
    return mutedUser !== null;
  }
}