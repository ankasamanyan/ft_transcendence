import {MessagesRepository} from "../../domain/messages-repository";
import {Message} from "../../domain/message";
import {PrismaService} from "../../service/prisma.service";

export class PrismaMessagesRepository implements MessagesRepository {
    constructor(private prisma: PrismaService) {

    }

    getDialog(senderId: string, receiverId: string) {
    }

    save(message: Message) {
    }
}