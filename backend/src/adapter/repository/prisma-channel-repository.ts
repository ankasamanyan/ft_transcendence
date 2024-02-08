import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Channel} from "../../domain/channel";
import {PrismaChannelParticipantRepository} from "./prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "./prisma-channel-admin-repository";

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
                    ...(channel.owner?.id ? {channelOwnerId: channel.owner.id} : {}),
                    ...(channel.password ? {password: channel.password} : {}),
                }
            }
        );
        await this.prismaChannelParticipantRepository.addChannelParticipants(createdChannel.id, channel.participants);
        if (channel.type === "private") {
            await this.prismaChannelAdminRepository.addChannelAdmin(createdChannel.id, channel.admins[0]);
        }
    }

    async initializeChannels() {
        if (await this.prisma.channel.count() === 0) {
            await this.prisma.channel.createMany({
                data: [
                    {id: 1, type: "dialog", name: "Cedric"},
                    {id: 2, type: "dialog", name: "Tania"},
                    {id: 3, type: "dialog", name: "Krisi"},
                    {id: 4, type: "dialog", name: "Santiago"},
                    {id: 5, type: "dialog", name: "Fedia"},
                    {id: 6, type: "dialog", name: "Wolf"},
                ]
            });
        }
    }
}