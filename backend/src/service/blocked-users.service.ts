import {Injectable} from '@nestjs/common';
import {Users, User} from "../domain/user";
import {from} from "rxjs";
import { PrismaUsersRepository } from 'src/adapter/repository/prisma-users-repository';
import { PrismaBlockedUsersRepository } from 'src/adapter/repository/prisma-blocked-users-repository';

@Injectable()
export class BlockedUsersService {
  constructor(private blockedUsersRepository: PrismaBlockedUsersRepository) {}

  blockUser(users: Users) {
    return from(this.blockedUsersRepository.blockUser(users));
  }

  unblockUser(blockerId: number, blockedId: number) {
    return from(this.blockedUsersRepository.unblockUser(blockerId, blockedId));
    }
  
  getBlockedUsers(userId: number) {
    return from(this.blockedUsersRepository.getBlockedUsers(userId));
  }   
  
  isBlocked(blockerId: number, blockedId: number) {
    return from(this.blockedUsersRepository.isBlocked(blockerId, blockedId));
  }

}
