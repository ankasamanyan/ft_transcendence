import {User} from "../../domain/user";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {UserResponse, UsersResponse} from "../dto/users-response";

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
      picture: string
    }] = await this.prisma.$queryRaw`
        SELECT u.id          as id,
               u.name        as name,
               u.intra_login as intra_login,
               u.picture     as picture
        from "User" u
                 LEFT JOIN "ChannelParticipant" p on u.id = p.user_id
        where p.channel_id = ${channelIdInt}`
    return new UsersResponse(participants.map((user) => {
      return new UserResponse(
        user.id,
        user.name,
        user.intra_login,
        user.picture);
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

  async leaveChannel(channelId: number, userId: number) {
    await this.prisma.channelParticipant.deleteMany({
      where: {
        user_id: Number(userId),
        channel_id: Number(channelId)
      }
    })
  }

  async enterChannel(user: User, channelId: number) {
      const bannedUser = await this.prisma.bannedUser.findFirst({
        where: {
          user_id: Number(user.id),
          channel_id: Number(channelId)
        },
      });
      if (bannedUser) {
        console.log('User is banned');
      } else {
        await this.prisma.channelParticipant.create({
          data: {
            channel_id: Number(channelId),
            user_id: Number(user.id),
          },
        });
        console.log('User added to ParticipantTable');
      }
    }
}