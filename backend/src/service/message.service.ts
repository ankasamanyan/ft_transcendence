import {Injectable} from '@nestjs/common';
import {Message} from "../domain/message";
import {PrismaMessagesRepository} from "../adapter/repository/prisma-messages-repository";
import {from} from "rxjs";
import {ChannelMessage} from "../domain/channel-message";

@Injectable()
export class MessageService {
  constructor(public messageRepository: PrismaMessagesRepository) {
  }

  initializeMessages() {
    return from(this.messageRepository.initializeMessages());
  }

  initializeChannelMessages() {
    return from(this.messageRepository.initializeChannelMessages());
  }

  save(message: Message) {
    return this.messageRepository.save(message);
  }

  saveChannelMessage(message: ChannelMessage) {
    return this.messageRepository.saveChannelMessage(message);
  }
}
