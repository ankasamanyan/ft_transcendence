import {MessagesRepository} from "../../domain/messages-repository";
import {Message} from "../../domain/message";

export class PrismaMessagesRepository implements MessagesRepository {
    constructor() {

    }

    getDialog(senderId: string, receiverId: string) {
    }

    save(message: Message) {
    }
}