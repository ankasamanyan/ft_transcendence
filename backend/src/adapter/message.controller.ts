import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {MessageService} from "../service/message.service";
import { MessageRequest } from 'src/adapter/dto/message-request';
import {ChannelMessageRequest} from "./dto/channel-message-request";
import {JWTAuthGuard} from "../auth/guards/auth.jwt.guard";

@Controller('/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  // @UseGuards(JWTAuthGuard)
  @Post("/mocks2")
  initializeChannelMessages() {
    return this.messageService.initializeChannelMessages();
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/:channelId')
  getChannelMessages(@Param('channelId') channelId: number) {
    return this.messageService.getChannelMessages(channelId);
  }
}
