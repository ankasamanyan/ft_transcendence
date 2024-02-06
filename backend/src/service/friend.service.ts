import {Injectable} from '@nestjs/common';
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

  initializeFriends() {
    return from(this.friendRepository.initializeFriends());
  }
}
