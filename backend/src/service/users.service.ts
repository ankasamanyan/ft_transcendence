import {Injectable} from '@nestjs/common';
import {User, Users} from "../domain/user";
import {from} from "rxjs";
import {PrismaUsersRepository} from "../adapter/repository/prisma-users-repository";

@Injectable()
export class UsersService {
  constructor(public usersRepository: PrismaUsersRepository) {
  }

  initializeUsers() {
    return from(this.usersRepository.initializeUsers());
  }

  addUser(user: User) {
    return from(this.usersRepository.addUser(user));
  }

  getUsers(userId: number) {
    return this.usersRepository.getUsers(userId);
  }
}
