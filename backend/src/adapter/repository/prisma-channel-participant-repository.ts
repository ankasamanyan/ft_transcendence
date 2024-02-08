import {User} from "../../domain/user";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaChannelParticipantRepository {
    constructor(private prisma: PrismaService) {

    }

    async addChannelParticipants(channelId: number, users: User[]) {
        const participants = users.map(user => ({channel_id: channelId, user_id: user.id}));
        await this.prisma.channelParticipant.createMany({
                data: participants
            }
        );
    }
}