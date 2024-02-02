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
    return new Users([
      new User(
        1,
        "Cedric",
        "assets/placeholderComrade2.jpeg"),
      new User(
        2,
        "Tania",
        "assets/placeholderComrade.jpeg"),
      new User(
        3,
        "Krisi",
        "assets/placeholderComrade3.jpeg"),
      new User(
        4,
        "Santiago",
        "assets/placeholderComrade4.jpeg"),
      new User(
        5,
        "Fedia",
        "assets/placeholderComrade5.jpeg"),
      new User(
        6,
        "Wolf",
        "assets/placeholderComrade6.jpeg")
    ]);
  }
}
