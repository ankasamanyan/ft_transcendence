import {User} from "../../domain/user";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaChannelParticipantRepository {
    constructor(private prisma: PrismaService) {

    }

    async getChannelParticipants(channelId: number) {
        const participants = await this.prisma.channelParticipant.findMany({
            where: {
                channel_id: Number(channelId)
            }
        });

        return participants.map((participant) => {
            return participant.id;
        });
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
}