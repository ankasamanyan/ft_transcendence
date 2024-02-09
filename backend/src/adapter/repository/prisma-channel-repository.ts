import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Channel} from "../../domain/channel";
import {PrismaChannelParticipantRepository} from "./prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "./prisma-channel-admin-repository";
import {ChannelResponse, ChannelsResponse} from "../dto/channel.response";

interface RawSql {
    channelname: string,
    channelpicture: string,
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
                    picture: channel.picture,
                    ...(channel.owner?.id ? {channelOwnerId: channel.owner.id} : {}),
                }
            }
        );
        await this.prismaChannelParticipantRepository.addChannelParticipants(createdChannel.id, channel.participants);
        if (channel.type === "private") {
            await this.prismaChannelAdminRepository.addChannelAdmin(createdChannel.id, channel.admins[0]);
        }
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

            select m.channel_id    as channelId,
                   m.text          as lastMessage,
                   m.created_at    as lastMessageCreatedAt,
                   channel.name    as channelName,
                   channel.picture as channelPicture

            from "ChannelMessage" m
                     LEFT JOIN "Channel" channel on channel.id = m.channel_id

            where m.id in (SELECT id from subres)
            order by m.created_at desc
        `;

        return new ChannelsResponse(channels.map((channel) => {
            return new ChannelResponse(
                channel.channelname,
                channel.channelpicture,
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
                    {id: 1, type: "dialog", name: "Cedric", picture: "assets/placeholderComrade2.jpeg"},
                    {id: 2, type: "dialog", name: "Tania", picture: "assets/placeholderComrade.jpeg"},
                    {id: 3, type: "dialog", name: "Krisi", picture: "assets/placeholderComrade3.jpeg"},
                    {id: 4, type: "dialog", name: "Santiago", picture: "assets/placeholderComrade4.jpeg"},
                    {id: 5, type: "dialog", name: "Fedia", picture: "assets/placeholderComrade5.jpeg"},
                    {id: 6, type: "dialog", name: "Wolf", picture: "assets/placeholderComrade6.jpeg"},
                ]
            });
            this.prismaChannelParticipantRepository.initialiseChannelParticipants();
        }
    }
}