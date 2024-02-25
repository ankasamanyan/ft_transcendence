import {Injectable} from '@nestjs/common';
import {User} from "../domain/user";
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

  getUserById(userId: number) {
    return from(this.usersRepository.getUserById(userId));
  }

  getUsers(userId: number) {
    return from(this.usersRepository.getUsers(userId));
  }

  getAllUsers() {
    return from(this.usersRepository.getAllUsers());
  }

  updateNameOrPicture(user: User) {
    return from(this.usersRepository.updateNameOrPicture(user));
  }

  isUniqueName(name: string) {
    return from(this.usersRepository.isUniqueName(name));
  }

}
