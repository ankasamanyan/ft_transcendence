import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {User} from "../../domain/user";
import {UserResponse, UsersResponse} from "../dto/users-response";
import {ChannelUpdate} from "src/domain/channel-update";

@Injectable()
export class PrismaChannelAdminRepository {
  constructor(private prisma: PrismaService) {

  }

  async addChannelAdmin(channelId: number, user: User) {
    await this.prisma.channelAdmin.create({
        data: {
          channel_id: Number(channelId),
          user_id: Number(user.id),
        }
      }
    );
  }

  async addChannelAdmins(channelUpdate: ChannelUpdate) {
    const userIds = channelUpdate.users.map(user => user.id);
    const channelAdmins = userIds.map(userId => ({
      channel_id: Number(channelUpdate.channelId),
      user_id: userId
    }));

    await this.prisma.channelAdmin.createMany({
      data: channelAdmins
    });
  }

  async getChannelAdmins(channelId: number) {
    const channelIdInt = Number(channelId);
    const admins: [{
      id: number,
      name: string,
      intra_login: string,
      picture: string,
      email: string,
      is_authenticated: boolean,
      tfa_enabled: boolean
    }] = await this.prisma.$queryRaw`
        SELECT u.id               as id,
               u.name             as name,
               u.intra_login      as intra_login,
               u.picture          as picture,
               u.email            as email,
               u.is_authenticated as is_authenticated,
               u.tfa_enabled      as tfa_enabled
        from "User" u
                 LEFT JOIN "ChannelAdmin" a on u.id = a.user_id
        where a.channel_id = ${channelIdInt}`
    return new UsersResponse(admins.map((user) => {
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

  async assignAdmin(user: User, channelId: number) {
    return this.prisma.channelAdmin.create({
      data: {
        channel_id: Number(channelId),
        user_id: Number(user.id)
      }
    })
  }

  async removeAdmin(channelId: number, userId: number) {
    return this.prisma.channelAdmin.deleteMany({
      where: {
        channel_id: Number(channelId),
        user_id: Number(userId)
      }
    })
  }

  async removeChannelAdmins(channelUpdate: ChannelUpdate) {
    const userIds = channelUpdate.users.map(user => user.id);
    await this.prisma.channelAdmin.deleteMany({
      where: {
        channel_id: Number(channelUpdate.channelId),
        user_id: {
          in:
          userIds
        }
      }
    })
  }

}