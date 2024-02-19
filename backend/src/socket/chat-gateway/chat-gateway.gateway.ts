import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {ChannelMessageRequest} from "../../adapter/dto/channel-message-request";
import {MessageService} from "../../service/message.service";
import {Server} from "socket.io";
import {ChannelService} from "../../service/channel.service";
import {ChannelRequest} from "../../adapter/dto/channel.request";
import {ChannelUpdateRequest} from "../../adapter/dto/channel-update.request";

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

  @SubscribeMessage('passwordRemoval')
  async deletePassword(@MessageBody() channelId: number) {
    await this.channelService.deletePassword(channelId);
    this.server.emit("passwordDeleted");
  }

  @SubscribeMessage('passwordChange')
  async setPassword(@MessageBody() request: ChannelRequest) {
    await this.channelService.setPassword(ChannelRequest.toDomain(request));
    this.server.emit("passwordSet");
  }

  @SubscribeMessage('newAdmins')
  async assignAdmins(@MessageBody() request: ChannelUpdateRequest) {
    await this.channelService.addChannelAdmins(ChannelUpdateRequest.toDomain(request));
    this.server.emit("adminsAdded");
  }

  @SubscribeMessage('adminsNoMore')
  async removeAdmins(@MessageBody() request: ChannelUpdateRequest) {
    await this.channelService.removeChannelAdmins(ChannelUpdateRequest.toDomain(request));
    this.server.emit("adminsRemoved");
  }

  @SubscribeMessage('participantsNoMore')
  async kickUsers(@MessageBody() request: ChannelUpdateRequest) {
    await this.channelService.kickUsers(ChannelUpdateRequest.toDomain(request));
    this.server.emit("participantKicked");
  }

  @SubscribeMessage('participantsNeverAgain')
  async banUsers(@MessageBody() request: ChannelUpdateRequest) {
    await this.channelService.banUsers(ChannelUpdateRequest.toDomain(request));
    this.server.emit("participantBanned");
  }

  @SubscribeMessage('participantHush')
  async muteUsers(@MessageBody() request: ChannelUpdateRequest) {
    await this.channelService.muteUsers(ChannelUpdateRequest.toDomain(request));
    this.server.emit("participantMuted");
  }

  @SubscribeMessage('participantLeaving')
  async leaveChannel(@MessageBody() request: ChannelUpdateRequest) {
    await this.channelService.leaveChannel(ChannelUpdateRequest.toDomain(request));
    this.server.emit("participantLeft");
  }
}
