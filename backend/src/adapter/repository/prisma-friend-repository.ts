import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Users} from "../../domain/user";

@Injectable()
export class PrismaFriendRepository {
    constructor(private prisma: PrismaService) {

    }

    async sendAFriendRequest(users: Users) {
        await this.prisma.friend.create({
            data: {
                sent_user_id: Number(users.users[0].id),
                received_user_id: Number(users.users[1].id),
                status: "PENDING"
            }}
        );
    }
}