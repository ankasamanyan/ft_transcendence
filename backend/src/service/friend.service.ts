import {Injectable} from '@nestjs/common';
import {Users} from "../domain/user";
import {PrismaFriendRepository} from "../adapter/repository/prisma-friend-repository";

@Injectable()
export class FriendService {
  constructor(public friendRepository: PrismaFriendRepository) {
  }

  sendAFriendRequest(users: Users) {
    return this.friendRepository.sendAFriendRequest(users);
  }
}
