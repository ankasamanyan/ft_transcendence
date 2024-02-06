import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UsersRequest} from "./dto/users-request";
import {FriendService} from "../service/friend.service";

@Controller('/friends')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post()
  sendAFriendRequest(@Body() request: UsersRequest) {
    return this.friendService.sendAFriendRequest(UsersRequest.toDomain(request));
  }

  @Get('/:userId')
  getFriends(@Param('userId') userId: number) {
    return this.friendService.getFriends(userId);
  }

  @Post("/mocks")
  initializeFriends() {
    return this.friendService.initializeFriends();
  }
}
