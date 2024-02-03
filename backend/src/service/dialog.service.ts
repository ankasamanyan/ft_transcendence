import {Injectable} from '@nestjs/common';
import {PrismaMessagesRepository} from "../adapter/repository/prisma-messages-repository";
import {from} from "rxjs";

@Injectable()
export class DialogService {
  constructor(public messagesRepository: PrismaMessagesRepository) {
  }

  getDialog(senderId: number, receiverId: number) {
    return from(this.messagesRepository.getDialog(senderId, receiverId));
  }
}
