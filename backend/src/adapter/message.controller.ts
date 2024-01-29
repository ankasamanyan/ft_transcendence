import {Controller, Post} from '@nestjs/common';
import {MessageService} from "../service/message.service";
import { MessageRequest } from 'src/adapter/dto/message-request';

@Controller('/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

    //receives information from the frontend
  @Post()
  saveMessage(request: MessageRequest) {
    this.messageService.save(MessageRequest.toDomain(request));
  }

  //@get is used to get info from the backend and send to the frontend
}
