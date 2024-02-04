import {Injectable} from '@nestjs/common';
import {Users} from "../domain/user";
import { PrismaBlockedUsersRepository } from 'src/adapter/repository/prisma-blocked-users-repository';

@Injectable()
export class BlockedUsersService {
  constructor(private blockedUserRepository: PrismaBlockedUsersRepository) {}

  blockUser(users: Users) {

  }

  getBlockedUsers(blockerId: number) {

  }

  unblockUser(userToUnblock: number) {

  }
}
