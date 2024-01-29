import {Injectable} from '@nestjs/common';
import {User, Users} from "../domain/user";

@Injectable()
export class UsersService {
  //getUsers should fetch data from DB
  getUsers(userId: string) {
    return new Users([
      new User(
        "Cedric",
        "Cedric",
        "assets/placeholderComrade2.jpeg"),
      new User(
        "Tania",
        "Tania",
        "assets/placeholderComrade.jpeg"),
      new User(
        "Krisi",
        "Krisi",
        "assets/placeholderComrade3.jpeg"),
      new User(
        "Santiago",
        "Santiago",
        "assets/placeholderComrade4.jpeg"),
      new User(
        "Fedia",
        "Fedia",
        "assets/placeholderComrade5.jpeg"),
      new User(
        "Wolf",
        "Wolf",
        "assets/placeholderComrade6.jpeg")
    ]);
  }
}
