import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {ChannelMessageRequest} from "../adapter/dto/channel-message-request";
import {MessageService} from "../service/message.service";
import {Server} from "socket.io";

@WebSocketGateway({cors: {origin: '*'}})
export class ChatGatewayGateway {

  @WebSocketServer()
  server: Server;
  constructor(private messageService: MessageService) {

  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() request: ChannelMessageRequest) {
    await this.messageService.saveChannelMessage(ChannelMessageRequest.toDomain(request));
    this.server.emit("NewMessage");
  }
}
