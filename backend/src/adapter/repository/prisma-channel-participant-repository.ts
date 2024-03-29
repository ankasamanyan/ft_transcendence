import {User} from "../../domain/user";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {UserResponse, UsersResponse} from "../dto/users-response";
import {ChannelUpdate} from "src/domain/channel-update";

@Injectable()
export class PrismaChannelParticipantRepository {
  constructor(private prisma: PrismaService) {

  }

  async getChannelParticipants(channelId: number) {
    const channelIdInt = Number(channelId);
    const participants: [{
      id: number,
      name: string,
      intra_login: string,
      picture: string,
      email: string,
      is_authenticated: boolean,
      tfa_enabled: boolean,
      tfa_secret: string | undefined
    }] = await this.prisma.$queryRaw`
        SELECT u.id               as id,
               u.name             as name,
               u.intra_login      as intra_login,
               u.picture          as picture,
               u.email            as email,
               u.is_authenticated as is_authenticated,
               u.tfa_enabled      as tfa_enabled,
               u.tfa_secret         as tfa_secret
        from "User" u
                 LEFT JOIN "ChannelParticipant" p on u.id = p.user_id
        where p.channel_id = ${channelIdInt}`
    return new UsersResponse(participants.map((user) => {
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

  async addChannelParticipants(channelId: number, users: User[]) {
    const participants = users.map(user => ({channel_id: channelId, user_id: user.id}));
    await this.prisma.channelParticipant.createMany({
        data: participants
      }
    );
  }

  async initialiseChannelParticipants() {
    await this.prisma.channelParticipant.createMany({
        data: [
          {channel_id: 1, user_id: 1},
          {channel_id: 1, user_id: 3},
          {channel_id: 2, user_id: 1},
          {channel_id: 2, user_id: 2},
          {channel_id: 3, user_id: 1},
          {channel_id: 3, user_id: 4},
          {channel_id: 4, user_id: 1},
          {channel_id: 4, user_id: 5},
          {channel_id: 5, user_id: 1},
          {channel_id: 5, user_id: 6},
          {channel_id: 6, user_id: 1},
          {channel_id: 6, user_id: 7},
        ]
      }
    );
  }

  async kickUser(channelId: number, userId: number) {
    await this.prisma.channelParticipant.deleteMany({
      where: {
        user_id: Number(userId),
        channel_id: Number(channelId)
      }
    })
  }

  async kickUsers(channelUpdate: ChannelUpdate) {
    const userIds = channelUpdate.users.map(user => user.id);
    await this.prisma.channelParticipant.deleteMany({
      where: {
        channel_id: Number(channelUpdate.channelId),
        user_id: {
          in: userIds
        }
      }
    });
  }

  async leaveChannel(channelUpdate: ChannelUpdate) {
    await this.prisma.channelParticipant.deleteMany({
      where: {
        user_id: Number(channelUpdate.users[0].id),
        channel_id: Number(channelUpdate.channelId)
      }
    })
  }

  async enterChannel(channelUpdate: ChannelUpdate) {
    await this.prisma.channelParticipant.create({
      data: {
        channel_id: Number(channelUpdate.channelId),
        user_id: Number(channelUpdate.users[0].id),
      },
    });
  }
}