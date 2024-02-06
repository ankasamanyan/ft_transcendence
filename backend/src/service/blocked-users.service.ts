import {Injectable} from '@nestjs/common';
import {Users, User} from "../domain/user";
import {from} from "rxjs";
import { PrismaUsersRepository } from 'src/adapter/repository/prisma-users-repository';

@Injectable()
export class BlockedUsersService {
  constructor(private userRepository: PrismaUsersRepository) {}

  blockUser(users: Users) {
    return from(this.userRepository.blockUser(users));
  }

  getBlockedUsers(userId: number) {
    return from(this.userRepository.getBlockedUsers(userId));
  }

  unblockUser(users: Users) {
    return from(this.userRepository.unblockUser(users));
  }
}
