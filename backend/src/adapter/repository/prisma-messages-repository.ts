import {Message} from "../../domain/message";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaMessagesRepository {
    constructor(private prisma: PrismaService) {

    }

    getDialog(senderId: number, receiverId: number) {
    }

    save(message: Message) {
    }
}