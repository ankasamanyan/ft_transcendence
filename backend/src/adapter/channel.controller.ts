import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ChannelService} from "../service/channel.service";
import {UsersRequest} from "./dto/users-request";
import {Channel} from "../domain/channel";

@Controller('/channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post()
  addChannelInformation(@Body() request: UsersRequest) {
    this.channelService.addChannelInformation(Channel.aChannel(UsersRequest.toDomain(request).users));
  }

  @Get('/:userId')
  getChannels(@Param('userId') userId: number) {
    return this.channelService.getChannels(userId);
  }

  @Post("/mocks")
  initializeChannels() {
    return this.channelService.initializeChannels();
  }
}
