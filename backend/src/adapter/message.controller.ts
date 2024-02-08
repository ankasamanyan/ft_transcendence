import {Body, Controller, Post} from '@nestjs/common';
import {MessageService} from "../service/message.service";
import { MessageRequest } from 'src/adapter/dto/message-request';
import {ChannelMessageRequest} from "./dto/channel-message-request";

@Controller('/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post("/mocks")
  initializeMessages() {
    return this.messageService.initializeMessages();
  }

  @Post("/mocks2")
  initializeChannelMessages() {
    return this.messageService.initializeChannelMessages();
  }

  @Post()
  saveMessage(@Body() request: MessageRequest) {
    return this.messageService.save(MessageRequest.toDomain(request));
  }

  @Post("/channelMessage")
  saveChannelMessage(@Body() request: ChannelMessageRequest) {
    return this.messageService.saveChannelMessage(ChannelMessageRequest.toDomain(request));
  }
}
