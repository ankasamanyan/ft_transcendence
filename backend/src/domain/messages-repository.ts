import {Message} from "./message";

export interface MessagesRepository {
    save(message: Message);

    getDialog(senderId: string, receiverId: string);
}