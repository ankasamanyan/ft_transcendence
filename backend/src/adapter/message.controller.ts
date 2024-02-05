import {Body, Controller, Post} from '@nestjs/common';
import {MessageService} from "../service/message.service";
import { MessageRequest } from 'src/adapter/dto/message-request';

@Controller('/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post("/mocks")
  initializeMessages() {
    return this.messageService.initializeMessages();
  }

  @Post()
  saveMessage(@Body() request: MessageRequest) {
    return this.messageService.save(MessageRequest.toDomain(request));
  }
}
