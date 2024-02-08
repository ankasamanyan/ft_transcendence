import {Body, Controller, Post} from '@nestjs/common';
import {ChannelService} from "../service/channel.service";
import {ChannelRequest} from "./dto/channel-request";

@Controller('/channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post()
  addChannelInformation(@Body() request: ChannelRequest) {
    this.channelService.addChannelInformation(ChannelRequest.toDomain(request));
  }

  @Post("/mocks")
  initializeChannels() {
    return this.channelService.initializeChannels();
  }
}
