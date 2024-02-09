import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {User} from "../../domain/user";

@Injectable()
export class PrismaChannelAdminRepository{
    constructor(private prisma: PrismaService) {

    }

    async addChannelAdmin(channelId: number, user: User) {
        await this.prisma.channelAdmin.create({
            data: {
                channel_id: Number(channelId),
                user_id: Number(user.id),
            }}
        );
    }
}