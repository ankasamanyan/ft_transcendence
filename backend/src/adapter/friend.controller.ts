import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UsersRequest} from "./dto/users-request";
import {FriendService} from "../service/friend.service";
import { brotliDecompressSync } from 'zlib';
import {JWTAuthGuard} from "../auth/guards/auth.jwt.guard";

@Controller('/friends')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @UseGuards(JWTAuthGuard)
  @Post()
  sendAFriendRequest(@Body() request: UsersRequest) {
    return this.friendService.sendAFriendRequest(
      UsersRequest.toDomain(request),
      );
    }
    
  @UseGuards(JWTAuthGuard)
  @Post('/mocks')
  initializeFriends() {
    return this.friendService.initializeFriends();
  }
  
  //gets the pending requests that the user needs to answer
  @UseGuards(JWTAuthGuard)
  @Get('/pending/:userId')
  getPendingRequests(@Param('userId') userId: number) {
    return this.friendService.getPendingRequests(userId);
  }
  
  //first user is sender, second user is receiver
  @UseGuards(JWTAuthGuard)
  @Put('/accept')
  acceptFriendRequest(@Body() request: UsersRequest) {
    return this.friendService.acceptFriendRequest(
      UsersRequest.toDomain(request),
    );
  }
  
  @UseGuards(JWTAuthGuard)
  @Put('/reject')
  declineFriendReuqest(@Body() request: UsersRequest) {
    return this.friendService.declineFriendRequest(
      UsersRequest.toDomain(request),
    );
  }

  @UseGuards(JWTAuthGuard)
  @Get('/:userId')
  getFriends(@Param('userId') userId: number) {
    return this.friendService.getFriends(userId);
  }

  //first user is sender, second user is receiver
  @UseGuards(JWTAuthGuard)
  @Get('/befriendable/:sentUserId/:receivedUserId')
  befriendable(@Param('sentUserId') sentUserId: number, @Param('receivedUserId') receivedUserId: number) {
    return this.friendService.befriendable(sentUserId, receivedUserId);
  }
}
