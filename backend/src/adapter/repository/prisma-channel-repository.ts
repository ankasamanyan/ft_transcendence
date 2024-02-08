import {User, Users} from "../../domain/user";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Channel} from "../../domain/channel";
import {PrismaChannelParticipantRepository} from "./prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "./prisma-channel-admin-repository";

@Injectable()
export class PrismaChannelRepository{
    constructor(private prisma: PrismaService,
                private prismaChannelParticipantRepository: PrismaChannelParticipantRepository,
                private prismaChannelAdminRepository: PrismaChannelAdminRepository) {

    }

    createChannel(users: Users) {
    }

    async addChannel(channel: Channel) {
        const createdChannel = await this.prisma.channel.create({
            data: {
                name: channel.name,
                type: channel.type,
                channelOwnerId: Number(channel.owner.id),
                password: channel.password
            }}
        );
        await this.prismaChannelParticipantRepository.addChannelParticipants(createdChannel.id, channel.participants);
        await this.prismaChannelAdminRepository.addChannelAdmins(createdChannel.id, channel.admins);
    }
}