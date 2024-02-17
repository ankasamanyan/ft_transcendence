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

  @Get('/:sentUserId/:receivedUserId')
  befriendable(@Param('sentUserId') sentUserId: number, @Param('receivedUserId') receivedUserId: number) {
    return this.friendService.befriendable(sentUserId, receivedUserId);
  }

  @Post("/mocks")
  initializeFriends() {
    return this.friendService.initializeFriends();
  }

      //gets the pending requests that the user needs to answer
  @Get("/pending/:userId")
  getPendingRequests(@Param('userId') userId: number) {
    return this.friendService.getPendingRequests(userId);
  }

}
