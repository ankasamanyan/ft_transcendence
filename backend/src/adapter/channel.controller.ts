import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {of} from "rxjs";
import { UsersResponse } from 'src/adapter/dto/users-response';
import {UsersService} from "../service/users.service";
import {BlockedUsersService} from "../service/blocked-users.service";
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
