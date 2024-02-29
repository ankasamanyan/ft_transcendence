import {Injectable} from '@nestjs/common';
import {Users} from "../domain/user";
import {from} from "rxjs";
import { PrismaBlockedUsersRepository } from 'src/adapter/repository/prisma-blocked-users-repository';

@Injectable()
export class BlockedUsersService {


  constructor(private blockedUsersRepository: PrismaBlockedUsersRepository) {}

  async blockUser(users: Users) {
    return from(this.blockedUsersRepository.blockUser(users));
  }

  async unblockUser(blockerId: number, blockedId: number) {
    return from(this.blockedUsersRepository.unblockUser(blockerId, blockedId));
  }
  
  getBlockedUsers(userId: number) {
    return from(this.blockedUsersRepository.getBlockedUsers(userId));
  }   
  
  isBlocked(blockerId: number, blockedId: number) {
    return from(this.blockedUsersRepository.isBlocked(blockerId, blockedId));
  }

}
