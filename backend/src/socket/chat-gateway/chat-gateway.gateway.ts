import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {ChannelMessageRequest} from "../../adapter/dto/channel-message-request";
import {MessageService} from "../../service/message.service";
import {Server} from "socket.io";
import {ChannelService} from "../../service/channel.service";
import {ChannelRequest} from "../../adapter/dto/channel.request";

@WebSocketGateway({cors: {origin: '*'}})
export class ChatGatewayGateway {

  @WebSocketServer()
  server: Server;
  constructor(
    private messageService: MessageService,
    private channelService: ChannelService) {

  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() request: ChannelMessageRequest) {
    await this.messageService.saveChannelMessage(ChannelMessageRequest.toDomain(request));
    this.server.emit("NewMessage");
  }

  @SubscribeMessage('channelRename')
  async renameMessage(@MessageBody() request: ChannelRequest) {
    await this.channelService.renameChannel(ChannelRequest.toDomain(request));
    this.server.emit("channelRenamed");
  }

  @SubscribeMessage('channelTypeChange')
  async changeChannelType(@MessageBody() request: ChannelRequest) {
    await this.channelService.changeChannelType(ChannelRequest.toDomain(request));
    this.server.emit("channelTypeChanged");
  }
}
