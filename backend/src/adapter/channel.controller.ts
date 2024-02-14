import {Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';
import {ChannelService} from "../service/channel.service";
import {UserRequest, UsersRequest} from "./dto/users-request";
import {Channel} from "../domain/channel";
import {Observable} from "rxjs";
import {ChannelResponse} from "./dto/channel.response";
import {ChannelRequest} from "./dto/channel.request";
import { UserResponse } from './dto/users-response';

@Controller('/channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post()
  addChannelInformation(@Body() request: UsersRequest): Observable<ChannelResponse> {
    return this.channelService.addChannelInformation(Channel.aChannel(UsersRequest.toDomain(request).users));
  }

  @Get('/:userId')
  getChannels(@Param('userId') userId: number) {
    return this.channelService.getChannels(userId);
  }

  @Get('/details/:channelId')
  getChannelDetailsById(@Param('channelId') channelId: number) {
    return this.channelService.getChannelDetailsById(channelId);
  }

  @Post('/participants')
  addChannelParticipants(@Body() request: ChannelRequest) {
    return this.channelService.addChannelParticipants(ChannelRequest.toDomain(request));
  }

  @Get('/participants/:channelId')
  getChannelParticipants(@Param('channelId') channelId: number) {
    return this.channelService.getChannelParticipants(channelId);
  }

  @Post('/admins')
  addChannelAdmin(@Body() request: ChannelRequest) {
    return this.channelService.addChannelAdmin(ChannelRequest.toDomain(request));
  }

  @Get('/admins/:channelId')
  getChannelAdmins(@Param('channelId') channelId: number) {
    return this.channelService.getChannelAdmins(channelId);
  }

  @Post("/mocks")
  initializeChannels() {
    return this.channelService.initializeChannels();
  }

  @Post("/set-password")
  setPassword(@Body() request: ChannelRequest) {
    return this.channelService.setPassword(ChannelRequest.toDomain(request));
  }

  @Delete("/delete-password/:channelId")
  deletePassword(@Param('channelId') channelId: number) {
    return this.channelService.deletePassword(channelId);
  }

  @Delete("/kick-user/:channelId/:userId")
  kickUser(@Param('channelId') channelId: number, @Param('userId') userId: number) {
    return this.channelService.kickUser(channelId, userId);
  }

  @Delete("/leave-channel/:channelId/:userId")
  leaveChannel(@Param('channelId') channelId: number, @Param('userId') userId: number) {
    return this.channelService.leaveChannel(channelId, userId);
  }

  @Post("/mute-user/:channelId")
  muteUser(@Body() request: UserRequest, @Param('channelId') channelId: number) {
    return this.channelService.muteUser(UserResponse.toDomain(request), channelId);
  }

  @Delete("unmute-user/:channelId/:userId")
  unmuteUser(@Param('channelId') channelId: number, @Param('userId') userId: number) {
    return this.channelService.unmuteUser(channelId, userId);
  }

  @Get("/muted-users/:channelId/:userId")
  isMuted(@Param('channelId') channelId: number, @Param('userId') userId: number) {
    return this.channelService.isMuted(channelId, userId);
  }

  @Post("/ban-user/:channelId")
  banUser(@Body() request: UserRequest,  @Param('channelId') channelId: number) {
    return this.channelService.banUser(UserResponse.toDomain(request), channelId);
  }

  @Delete("unban-user/:channelId/:userId")
  unbanUser(@Param('channelId') channelId: number, @Param('userId') userId: number) {
    return this.channelService.unbanUser(channelId, userId);
  }

}
