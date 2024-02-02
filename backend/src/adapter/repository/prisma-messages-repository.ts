import {MessagesRepository} from "../../domain/messages-repository";
import {Message} from "../../domain/message";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaMessagesRepository implements MessagesRepository {
    constructor(private prisma: PrismaService) {

    }

    getDialog(senderId: number, receiverId: number) {
    }

    save(message: Message) {
    }
}