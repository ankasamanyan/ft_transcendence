import {Injectable} from '@nestjs/common';
import {User, Users} from "../domain/user";

@Injectable()
export class UsersService {
  addUser(user: User) {

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
