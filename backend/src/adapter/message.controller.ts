import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {MessageService} from "../service/message.service";
import { MessageRequest } from 'src/adapter/dto/message-request';
import {ChannelMessageRequest} from "./dto/channel-message-request";

@Controller('/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post("/mocks2")
  initializeChannelMessages() {
    return this.messageService.initializeChannelMessages();
  }

  @Get('/:channelId')
  getChannelMessages(@Param('channelId') channelId: number) {
    return this.messageService.getChannelMessages(channelId);
  }

  @Post("/channelMessage")
  saveChannelMessage(@Body() request: ChannelMessageRequest) {
    return this.messageService.saveChannelMessage(ChannelMessageRequest.toDomain(request));
  }
}
