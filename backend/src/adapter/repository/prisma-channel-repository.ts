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

    async getChannelDetailsById(channelId: number) {
        const channel = await this.prisma.channel.findUnique({
            where: {
                id: Number(channelId)
            }
        });
        return new ChannelResponse(channel.name, channel.picture, channelId, channel.type);

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
                   channel.id         as channelId

            from "Channel" channel
                     LEFT JOIN "ChannelMessage" message on channel.id = message.channel_id

            where channel.id in (SELECT DISTINCT channel_id from "ChannelParticipant" where user_id = ${userIdAsInteger})
                AND message.text IS NULL
               OR (message.text IS NOT NULL AND message.id in (SELECT id from subres))
            order by message.created_at desc
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
                    {type: "dialog", name: "Cedric", picture: "assets/placeholderComrade2.jpeg"},
                    {type: "dialog", name: "Tania", picture: "assets/placeholderComrade.jpeg"},
                    {type: "dialog", name: "Krisi", picture: "assets/placeholderComrade3.jpeg"},
                    {type: "dialog", name: "Santiago", picture: "assets/placeholderComrade4.jpeg"},
                    {type: "dialog", name: "Fedia", picture: "assets/placeholderComrade5.jpeg"},
                    {type: "dialog", name: "Wolf", picture: "assets/placeholderComrade6.jpeg"},
                ]
            });
            this.prismaChannelParticipantRepository.initialiseChannelParticipants();
        }
    }
}