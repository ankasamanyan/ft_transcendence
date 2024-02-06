import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {UserRequest, UsersRequest} from "./dto/users-request";
import {BlockedUsersService} from "../service/blocked-users.service";

@Controller('/blocked-users')
export class BlockedUsersController {
  constructor(private blockedUsersService: BlockedUsersService) {}

  @Post()
  blockUser(@Body() request: UsersRequest) {
    this.blockedUsersService.blockUser(UsersRequest.toDomain(request));
  }

  @Delete()
  unblockUser(@Body() request: UsersRequest) {
    this.blockedUsersService.unblockUser(UsersRequest.toDomain(request));
  }

  @Get()
    getBlockedUsers(@Body() request: UserRequest) {
      this.blockedUsersService.getBlockedUsers(UserRequest.toDomain(request))
    }
}
