import {Injectable} from '@nestjs/common';
import {PrismaMessagesRepository} from "../adapter/repository/prisma-messages-repository";
import {from} from "rxjs";
import {ChannelMessage} from "../domain/channel-message";

@Injectable()
export class MessageService {
  constructor(public messageRepository: PrismaMessagesRepository) {
  }

  initializeChannelMessages() {
    return from(this.messageRepository.initializeChannelMessages());
  }

  getChannelMessages(channelId: number) {
    return from(this.messageRepository.getChannelMessages(channelId));
  }


  saveChannelMessage(message: ChannelMessage) {
    return this.messageRepository.saveChannelMessage(message);
  }
}
