import {Injectable, Param} from '@nestjs/common';
import {Users} from "../domain/user";
import {PrismaFriendRepository} from "../adapter/repository/prisma-friend-repository";
import {from} from "rxjs";

@Injectable()
export class FriendService {
  constructor(public friendRepository: PrismaFriendRepository) {
  }

  sendAFriendRequest(users: Users) {
    return this.friendRepository.sendAFriendRequest(users);
  }

  getFriends(userId: number) {
    return from(this.friendRepository.getFriends(userId));
  }

  befriendable(sentUserId: number, receivedUserId: number) {
    return from(this.friendRepository.befriendable(sentUserId, receivedUserId));
  }

  initializeFriends() {
    return from(this.friendRepository.initializeFriends());
  }

  getPendingRequests(userId: number) {
    return from(this.friendRepository.getPendingRequests(userId));
  }

  makeFriendRequest(senderId: number, recieverId: number) {
    return from(this.friendRepository.makeFriendRequest(senderId, recieverId));
  }
}
