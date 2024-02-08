import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {User} from "../../domain/user";

@Injectable()
export class PrismaChannelAdminRepository{
    constructor(private prisma: PrismaService) {

    }

    async addChannelAdmins(channelId: number, users: User[]) {
        const admins = users.map(user => ({channel_id: channelId, user_id: user.id}));
        await this.prisma.channelParticipant.createMany({
                data: admins
            }
        );
    }
}