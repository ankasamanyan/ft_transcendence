import {Body, Controller, Delete, Get, Post, Param} from '@nestjs/common';
import {UserRequest, UsersRequest} from "./dto/users-request";
import {BlockedUsersService} from "../service/blocked-users.service";

@Controller('/blocked-users')
export class BlockedUsersController {
  constructor(private blockedUsersService: BlockedUsersService) {}

  @Post()
  blockUser(@Body() request: UsersRequest) {
    return this.blockedUsersService.blockUser(UsersRequest.toDomain(request));
  }

  @Delete()
  async unblockUser(@Param('blockerId') blockerId: number, @Param('blockedId') blockedId: number) {
    return this.blockedUsersService.unblockUser(blockerId, blockedId);
  }

  @Get('/:userId')
  getBlockedUsers(@Param('userId') userId: number) {
    return this.blockedUsersService.getBlockedUsers(userId);
  }
}
