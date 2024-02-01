import {Injectable} from '@nestjs/common';
import {Dialog, Dialogs} from "../domain/dialog";

@Injectable()
export class DialogsService {
  
  getDialogs(authentificatedUser: string) {
    return new Dialogs([
      new Dialog(
        "Cedric",
        "assets/placeholderComrade2.jpeg",
        "I need cookies👉👈",
        "9.25"),
      new Dialog(
        "Tania",
        "assets/placeholderComrade.jpeg",
        "Deal🤝",
        "22.27"),
      new Dialog(
        "Krisi",
        "assets/placeholderComrade3.jpeg",
        "That's what she said",
        "19:07"),
      new Dialog(
        "Santiago",
        "assets/placeholderComrade4.jpeg",
        "🐱",
        "18:45"),
      new Dialog(
        "Fedia",
        "assets/placeholderComrade5.jpeg",
        "Да, компания собирается хорошая)",
        "16.13"),
      new Dialog(
        "Wolf",
        "assets/placeholderComrade6.jpeg",
        "Okay, I'll run it by my team, but it's a highly, highly unlikely scenario",
        "14:02")
    ]);
  }
}

