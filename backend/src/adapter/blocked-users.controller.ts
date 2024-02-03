import {Body, Controller, Post} from '@nestjs/common';
import {UsersRequest} from "./dto/users-request";
import {BlockedUsersService} from "../service/blocked-users.service";

@Controller('/blocked-users')
export class BlockedUsersController {
  constructor(private blockedUsersService: BlockedUsersService) {}

  @Post()
  blockUser(@Body() request: UsersRequest) {
    this.blockedUsersService.blockUser(UsersRequest.toDomain(request));
  }
}
