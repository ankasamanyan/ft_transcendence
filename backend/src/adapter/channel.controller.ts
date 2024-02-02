import {Body, Controller, Post} from '@nestjs/common';
import {UsersRequest} from "./dto/users-request";
import {ChannelService} from "../service/channel.service";

@Controller('/channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post()
  createChannel(@Body() request: UsersRequest) {
    this.channelService.createChannel(UsersRequest.toDomain(request));
  }
}
