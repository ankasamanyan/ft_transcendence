import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Channel} from "../../domain/channel";
import {PrismaChannelParticipantRepository} from "./prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "./prisma-channel-admin-repository";
import {ChannelResponse, ChannelsResponse} from "../dto/channel.response";

interface RawSql {
    channelname: string,
    channelpicture: string,
    createdat: Date,
    channelid: number,
    lastmessage: string,
    lastmessagecreatedat: Date
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

    async getChannelDetailsById(channelId: number) {
        const channel = await this.prisma.channel.findUnique({
            where: {
                id: Number(channelId)
            }
        });
        return new ChannelResponse(channel.name, channel.picture, channel.created_at, channelId, channel.type);

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
}