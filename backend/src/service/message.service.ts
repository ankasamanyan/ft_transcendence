import {Injectable} from '@nestjs/common';
import {Message} from "../domain/message";
import {PrismaMessagesRepository} from "../adapter/repository/prisma-messages-repository";
import {from} from "rxjs";

@Injectable()
export class MessageService {
  constructor(public messageRepository: PrismaMessagesRepository) {
  }

  initializeMessages() {
    return from(this.messageRepository.initializeMessages());
  }

  save(message: Message) {

  }
}
