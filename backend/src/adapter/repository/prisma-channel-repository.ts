import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Channel} from "../../domain/channel";
import {PrismaChannelParticipantRepository} from "./prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "./prisma-channel-admin-repository";
import {ChannelResponse, ChannelsResponse} from "../dto/channel.response";
import {User} from "../../domain/user";
import * as argon2 from 'argon2';
import { ConfirmPassword } from "src/domain/confirm-password";

interface RawSql {
  channelname: string,
  channelpicture: string,
  createdat: Date,
  channelid: number,
  lastmessage: string,
  lastmessagecreatedat: Date
}

interface ChannelDetails {
  name: string,
  picture: string,
  createdat: Date,
  type: string,
  ownerid: number,
  ownername: string,
  ownerpicture: string,
  ownerintraLogin: string,
  owneremail: string,
  ownerisauthenticated: boolean
}

@Injectable()
export class PrismaChannelRepository {
  constructor(private prisma: PrismaService,
              private prismaChannelParticipantRepository: PrismaChannelParticipantRepository,
              private prismaChannelAdminRepository: PrismaChannelAdminRepository) {

  }

  async addChannel(channel: Channel) {
    const createdChannel = await this.prisma.channel.create({
        data: {
          name: channel.name,
          type: channel.type,
          created_at: channel.createdAt,
          picture: channel.picture,
          ...(channel.owner?.id ? {channelOwnerId: channel.owner.id} : {}),
        }
      }
    );

    return new ChannelResponse(
      createdChannel.name,
      createdChannel.picture,
      createdChannel.created_at,
      createdChannel.id,
      createdChannel.type,
      channel.participants,
      channel.owner,
      channel.admins
    );
  }

  async removeChannel(channelId: number) {
    await this.prisma.channel.delete({
      where: {
        id: Number(channelId)
      }
    })
  }

  async getChannelDetailsById(channelId: number) {
    const channelIdAsInteger = Number(channelId);
    const channel = await this.prisma.$queryRaw<ChannelDetails>`
        select c.name             as name,
               c.picture          as picture,
               c.created_at       as createdat,
               c.type             as type,
               c.password         as password,
               u.id               as ownerid,
               u.name             as ownername,
               u.picture          as ownerpicture,
               u.intra_login      as ownerintraLogin,
               u.email            as owneremail,
               u.is_authenticated as ownerisauthenticated
        from "Channel" c
                 LEFT JOIN "User" u on c."channelOwnerId" = u.id
        where c.id = ${channelIdAsInteger}
    `;
    return new ChannelResponse(
      channel[0].name,
      channel[0].picture,
      channel[0].createdat,
      channelId,
      channel[0].type,
      undefined,
      new User(
        channel[0].ownerid,
        channel[0].ownername,
        channel[0].ownerpicture,
        channel[0].ownerintraLogin,
        channel[0].owneremail,
        channel[0].ownerisauthenticated),
      undefined,
      undefined,
      undefined,
      channel[0].password);
  }

  async getChannels(userId: number) {
    const userIdAsInteger = Number(userId);
    const channels = await this.prisma.$queryRaw<RawSql[]>`
        with subres as (select max(id) as id
                        from "ChannelMessage"
                        where channel_id in (SELECT DISTINCT channel_id
                                             from "ChannelParticipant"
                                             where user_id = ${userIdAsInteger})
                        GROUP BY (channel_id))

        select message.text       as lastMessage,
               message.created_at as lastMessageCreatedAt,
               channel.name       as channelName,
               channel.picture    as channelPicture,
               channel.id         as channelId,
               channel.created_at as channelCreatedAt

        from "Channel" channel
                 LEFT JOIN "ChannelMessage" message on channel.id = message.channel_id

        where channel.id in
              (SELECT DISTINCT channel_id from "ChannelParticipant" where user_id = ${userIdAsInteger})
            AND message.text IS NULL
           OR (message.text IS NOT NULL AND message.id in (SELECT id from subres))
        order by COALESCE(message.created_at, channel.created_at) desc
    `;

    return new ChannelsResponse(channels.map((channel) => {
      return new ChannelResponse(
        channel.channelname,
        channel.channelpicture,
        channel.createdat,
        channel.channelid,
        undefined,
        undefined,
        undefined,
        undefined,
        channel.lastmessage,
        channel.lastmessagecreatedat
      );
    }));
  }

  async renameChannel(channel: Channel) {
    await this.prisma.channel.update({
      where: {
        id: Number(channel.id)
      },
      data: {
        name: channel.name,
      },
    });
  }

  async changeChannelType(channel: Channel) {
    await this.prisma.channel.update({
      where: {
        id: Number(channel.id)
      },
      data: {
        type: channel.type,
      },
    });
  }

  async initializeChannels() {
    if (await this.prisma.channel.count() === 0) {
      await this.prisma.channel.createMany({
        data: [
          {type: "dialog", name: "Cedric", picture: "assets/placeholderComrade2.jpeg", created_at: new Date()},
          {type: "dialog", name: "Tania", picture: "assets/placeholderComrade.jpeg", created_at: new Date()},
          {type: "dialog", name: "Krisi", picture: "assets/placeholderComrade3.jpeg", created_at: new Date()},
          {type: "dialog", name: "Santiago", picture: "assets/placeholderComrade4.jpeg", created_at: new Date()},
          {type: "dialog", name: "Fedia", picture: "assets/placeholderComrade5.jpeg", created_at: new Date()},
          {type: "dialog", name: "Wolf", picture: "assets/placeholderComrade6.jpeg", created_at: new Date()},
        ]
      });
      this.prismaChannelParticipantRepository.initialiseChannelParticipants();
    }
  }

  async setPassword(channel: Channel) {
    const hashedPassword = await argon2.hash(channel.password);
    await this.prisma.channel.update({
      where: {
        id: Number(channel.id),
      },
      data: {
        password: hashedPassword
      },
    });
  }

  // async setPassword(channel: Channel) {
  //   await this.prisma.channel.update({
  //     where: {
  //       id: Number(channel.id),
  //     },
  //     data: {
  //       password: channel.password,
  //     },
  //   });
  // }

  async deletePassword(channelId: number) {
    await this.prisma.channel.update({
      where: {
        id: Number(channelId),
      },
      data: {
        password: null,
      },
    });
  }

  async changeStatus(channelId: number, status: string, password: string | null) {
    await this.prisma.channel.update({
      where: {
        id: Number(channelId),
      },
      data: {
        type: status,
        password: password,
      },
    })
  }

  async getStatus(channelId: number) {
    const channel = await this.prisma.channel.findFirst({
      where: {
        id: Number(channelId)
      },
      select: {
        type: true
      }
    });
    return channel.type;
  }

  async getJoinedPublicandProtectedChannels(userId: number) {

    const userIdAsInteger = Number(userId);
    const channels = await this.prisma.$queryRaw<RawSql[]>`
        with subres as (select max(id) as id
                        from "ChannelMessage"
                        where channel_id in (SELECT DISTINCT channel_id
                                             from "ChannelParticipant")
                        GROUP BY (channel_id))

        select message.text       as lastMessage,
               message.created_at as lastMessageCreatedAt,
               channel.name       as channelName,
               channel.picture    as channelPicture,
               channel.id         as channelId,
               channel.created_at as channelCreatedAt

        from "Channel" channel
                 LEFT JOIN "ChannelMessage" message on channel.id = message.channel_id

        where channel.id in
              (SELECT DISTINCT channel_id
               from "ChannelParticipant"
               where user_id = ${userIdAsInteger}
                  or channel.type in ('public', 'password-protected'))
            AND message.text IS NULL
           OR (message.text IS NOT NULL AND message.id in (SELECT id from subres))
        order by COALESCE(message.created_at, channel.created_at) desc
        
    `;

    return new ChannelsResponse(channels.map((channel) => {
      return new ChannelResponse(
        channel.channelname,
        channel.channelpicture,
        channel.createdat,
        channel.channelid,
        undefined,
        undefined,
        undefined,
        undefined,
        channel.lastmessage,
        channel.lastmessagecreatedat
      );
    }));
  }

}