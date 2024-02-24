import {Body, Controller, Get, Param, Post, Put, Delete, UseGuards} from '@nestjs/common';
import {ChannelService} from "../service/channel.service";
import {UsersRequest} from "./dto/users-request";
import {Channel} from "../domain/channel";
import {Observable} from "rxjs";
import {ChannelResponse} from "./dto/channel.response";
import {ChannelRequest} from "./dto/channel.request";
import { ChannelUpdateRequest } from './dto/channel-update.request';
import { ConfirmPasswordRequest } from './dto/confirm-password-request';

@Controller('/channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  // @UseGuards(JWTAuthGuard)
  @Post()
  addChannelInformation(@Body() request: UsersRequest): Observable<ChannelResponse> {
    return this.channelService.addChannelInformation(
      Channel.aChannel(UsersRequest.toDomain(request).users),
    );
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/get-channels/:userId')
  getChannels(@Param('userId') userId: number) {
    return this.channelService.getChannels(userId);
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/details/:channelId')
  getChannelDetailsById(@Param('channelId') channelId: number) {
    return this.channelService.getChannelDetailsById(channelId);
  }

  // @UseGuards(JWTAuthGuard)
  @Post('/participants')
  addChannelParticipants(@Body() request: ChannelRequest) {
    return this.channelService.addChannelParticipants(ChannelRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/participants/:channelId')
  getChannelParticipants(@Param('channelId') channelId: number) {
    return this.channelService.getChannelParticipants(channelId);
  }

  // @UseGuards(JWTAuthGuard)
  @Post('/admins')
  addChannelAdmin(@Body() request: ChannelRequest) {
    return this.channelService.addChannelAdmin(ChannelRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/admins/:channelId')
  getChannelAdmins(@Param('channelId') channelId: number) {
    return this.channelService.getChannelAdmins(channelId);
  }

  // @UseGuards(JWTAuthGuard)
  @Post("/mocks")
  initializeChannels() {
    return this.channelService.initializeChannels();
  }

  // @UseGuards(JWTAuthGuard)
  @Put('/name')
  renameChannel(@Body() request: ChannelRequest) {
    return this.channelService.renameChannel(ChannelRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Delete("/delete-channel/:channelId")
  removeChannel(@Param('channelId') channelId: number) {
    return this.channelService.removeChannel(channelId);
  }

  // @UseGuards(JWTAuthGuard)
  @Put("/set-password")
  setPassword(@Body() request: ChannelRequest) {
    return this.channelService.setPassword(ChannelRequest.toDomain(request));
  }

  @Get('/confirm-password')
  confirmPassword(@Body() request: ConfirmPasswordRequest) {
    return this.channelService.confirmPassword(ConfirmPasswordRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Delete("/delete-password/:channelId")
  deletePassword(@Param('channelId') channelId: number) {
    return this.channelService.deletePassword(channelId);
  }

  // @UseGuards(JWTAuthGuard)
  @Post("/enter-channel")
  enterChannel(@Body() request: ChannelUpdateRequest) {
    return this.channelService.enterChannel(ChannelUpdateRequest.toDomain(request));
  }

  // @Delete("/kick-user/:channelId/:userId")
  // kickUser(@Param('channelId') channelId: number, @Param('userId') userId: number) {
  //   return this.channelService.kickUser(channelId, userId);
  // }

  // @UseGuards(JWTAuthGuard)
  @Delete('/kick-users')
  kickUsers(@Body() request: ChannelUpdateRequest) {
    return this.channelService.kickUsers(ChannelUpdateRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Delete("/leave-channel")
  leaveChannel(@Body() request: ChannelUpdateRequest) {
    return this.channelService.leaveChannel(ChannelUpdateRequest.toDomain(request));
  }

  // @Post("/mute-user/:channelId")
  // muteUser(@Body() request: UserRequest, @Param('channelId') channelId: number) {
  //   return this.channelService.muteUser(UserResponse.toDomain(request), channelId);
  // }

  // @UseGuards(JWTAuthGuard)
  @Post('/mute-users')
  muteUsers(@Body() request: ChannelUpdateRequest) {
    return this.channelService.muteUsers(ChannelUpdateRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Delete("/unmute-user/:channelId/:userId")
  unmuteUser(@Param('channelId') channelId: number, @Param('userId') userId: number) {
    return this.channelService.unmuteUser(channelId, userId);
  }

  // @UseGuards(JWTAuthGuard)
  @Get("/muted-users/:channelId/:userId")
  isMuted(@Param('channelId') channelId: number, @Param('userId') userId: number) {
    return this.channelService.isMuted(channelId, userId);
  }

  // @Post("/ban-user/:channelId")
  // banUser(@Body() request: UserRequest,  @Param('channelId') channelId: number) {
  //   return this.channelService.banUser(UserResponse.toDomain(request), channelId);
  // }


  // @UseGuards(JWTAuthGuard)
  @Post('/ban-users')
  banUsers(@Body() request: ChannelUpdateRequest) {
    return this.channelService.banUsers(ChannelUpdateRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Delete("/unban-user/:channelId/:userId")
  unbanUser(@Param('channelId') channelId: number, @Param('userId') userId: number) {
    return this.channelService.unbanUser(channelId, userId);
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/is-banned/boolean')
  isBanned(@Body() request: ChannelUpdateRequest) {
    return this.channelService.isBanned(ChannelUpdateRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Post("/add-admins")
  assignAdmins(@Body() request: ChannelUpdateRequest) {
    return this.channelService.addChannelAdmins(ChannelUpdateRequest.toDomain(request));
  }

  // @Delete("/admins/:channelId/:userId")
  // removeAdmin(@Param('channelId') channelId: number, @Param('userId') userId: number) {
  //   return this.channelService.removeAdmin(channelId, userId);
  // }

  // @UseGuards(JWTAuthGuard)
  @Delete('/remove-admins')
  removeChannelAdmins(@Body() request: ChannelUpdateRequest) {
    return this.channelService.removeChannelAdmins(ChannelUpdateRequest.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Put("/status")
  changeStatus(@Body() request: ChannelRequest) {
    return this.channelService.changeStatus(ChannelResponse.toDomain(request));
  }

  // @UseGuards(JWTAuthGuard)
  @Get("/status/:channelId")
  getStatus(@Param('channelId') channelId: number) {
    return this.channelService.getStatus(channelId);
  }

  // @UseGuards(JWTAuthGuard)
  @Get('/joined-public-protected-channels/:userId')
  getJoinedPublicandProtectedChannels(@Param('userId') userId: number) {
    return this.channelService.getJoinedPublicandProtectedChannels(userId);
  }
}
