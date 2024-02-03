import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaDialogsRepository {
    constructor(private prisma: PrismaService) {

    }

    async getDialogs(userId: number) {
        const dialogs = await this.prisma.$queryRaw`
        SELECT DISTINCT ON (COALESCE(sender_id, receiver_id))
            sender_id,
            receiver_id,
            text,
            date
        FROM "Message"
        WHERE sender_id = ${userId} OR receiver_id = ${userId}
        ORDR BY COALESCE(sender_id, receiver_id), date DESC`
    }
}