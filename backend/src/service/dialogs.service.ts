import {Injectable} from '@nestjs/common';
import {Dialog, Dialogs} from "../domain/dialog";
import {User} from "../domain/user";
import {PrismaDialogsRepository} from "../adapter/repository/prisma-dialogs-repository";

@Injectable()
export class DialogsService {

  constructor(public dialogsRepository: PrismaDialogsRepository) {
  }

  getDialogs(userId: number) {
    return new Dialogs([
      new Dialog(
        new User(3, "Cedric", "assets/placeholderComrade2.jpeg"),
        "assets/placeholderComrade2.jpeg",
        "I need cookies👉👈",
          new Date(2024, 0, 30, 9, 25)),
      new Dialog(
        new User(2, "Tania", "assets/placeholderComrade.jpeg"),
        "assets/placeholderComrade.jpeg",
        "Deal🤝",
          new Date(2024, 0, 29, 22, 27)),
      new Dialog(
          new User(4, "Krisi", "assets/placeholderComrade3.jpeg"),
        "assets/placeholderComrade3.jpeg",
        "That's what she said",
          new Date(2024, 0, 29, 19, 7)),
      new Dialog(
        new User(5, "Santiago","assets/placeholderComrade4.jpeg"),
        "assets/placeholderComrade4.jpeg",
        "🐱",
          new Date(2024, 0, 29, 18, 45)),
      new Dialog(
          new User(6, "Fedia","assets/placeholderComrade5.jpeg"),
        "assets/placeholderComrade5.jpeg",
        "Да, компания собирается хорошая)",
          new Date(2024, 0, 29, 16, 13)),
      new Dialog(
        new User(7, "Wolf", "assets/placeholderComrade6.jpeg"),
        "assets/placeholderComrade6.jpeg",
        "Okay, I'll run it by my team, but it's a highly, highly unlikely scenario",
          new Date(2024, 0, 29, 14, 2)),
    ]);
  }
}
