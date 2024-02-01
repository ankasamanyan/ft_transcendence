import {Injectable} from '@nestjs/common';
import {Dialog, Dialogs} from "../domain/dialog";

@Injectable()
export class DialogsService {
  getDialogs(authenticatedUser: string) {
    return new Dialogs([
      new Dialog(
        "Cedric",
        "assets/placeholderComrade2.jpeg",
        "I need cookies👉👈",
          new Date(2024, 0, 30, 9, 25)),
      new Dialog(
        "Tania",
        "assets/placeholderComrade.jpeg",
        "Deal🤝",
          new Date(2024, 0, 29, 22, 27)),
      new Dialog(
        "Krisi",
        "assets/placeholderComrade3.jpeg",
        "That's what she said",
          new Date(2024, 0, 29, 19, 7)),
      new Dialog(
        "Santiago",
        "assets/placeholderComrade4.jpeg",
        "🐱",
          new Date(2024, 0, 29, 18, 45)),
      new Dialog(
        "Fedia",
        "assets/placeholderComrade5.jpeg",
        "Да, компания собирается хорошая)",
          new Date(2024, 0, 29, 16, 13)),
      new Dialog(
        "Wolf",
        "assets/placeholderComrade6.jpeg",
        "Okay, I'll run it by my team, but it's a highly, highly unlikely scenario",
          new Date(2024, 0, 29, 14, 2)),
    ]);
  }
}
