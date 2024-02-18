import {Injectable, Param} from '@nestjs/common';
import {Users} from "../domain/user";
import {PrismaFriendRepository} from "../adapter/repository/prisma-friend-repository";
import {from} from "rxjs";

@Injectable()
export class FriendService {
  constructor(public prismaFriendRepository: PrismaFriendRepository) {
  }

  sendAFriendRequest(users: Users) {
    return this.prismaFriendRepository.sendAFriendRequest(users);
  }

  getFriends(userId: number) {
    return from(this.prismaFriendRepository.getFriends(userId));
  }

  //befriendable(sentUserId: number, receivedUserId: number) {
  befriendable(users: Users) {
    return from(this.prismaFriendRepository.befriendable(users));
    
    //return from(this.friendRepository.befriendable(sentUserId, receivedUserId));
  }

  initializeFriends() {
    return from(this.prismaFriendRepository.initializeFriends());
  }

  getPendingRequests(userId: number) {
    return from(this.prismaFriendRepository.getPendingRequests(userId));
  }

  acceptFriendRequest(users: Users) {
    return from(this.prismaFriendRepository.acceptFriendRequest(users));
  }

  declineFriendRequest(users: Users) {
    return from(this.prismaFriendRepository.declineFriendRequest(users))
  }

}
