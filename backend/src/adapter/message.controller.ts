import {Controller, Post} from '@nestjs/common';
import {MessageService} from "../service/message.service";
import { MessageRequest } from 'src/adapter/dto/message-request';

@Controller('/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  saveMessage(request: MessageRequest) {
    this.messageService.save(MessageRequest.toDomain(request));
  }
}
