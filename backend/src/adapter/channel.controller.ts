import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {ChannelService} from "../service/channel.service";
import {UsersRequest} from "./dto/users-request";
import {Channel} from "../domain/channel";
import {Observable} from "rxjs";
import {ChannelResponse} from "./dto/channel.response";
import {ChannelRequest} from "./dto/channel.request";

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

  // @Put('/details/:channelId/:renameTo')
  // renameChannel(@Param('channelId') channelId: number, @Param('renameTo') renameTo: string) {
  //   return this.channelService.renameChannel(channelId, renameTo);
  // }

  @Post("/mocks")
  initializeChannels() {
    return this.channelService.initializeChannels();
  }
}
