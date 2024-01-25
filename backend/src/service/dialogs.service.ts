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
        "Tetiana",
        "assets/placeholderComrade.jpeg",
        "Oh well, you know, so distinguished",
        "22:25"),
      new Dialog(
        "Krisi",
        "assets/placeholderComrade3.jpeg",
        "So, I am curious: have you ever been in a situation",
        "19:04"),
      new Dialog(
        "Santiago",
        "assets/placeholderComrade4.jpeg",
        "Trying to reboot yet again",
        "18:45"),
      new Dialog(
        "Fedia",
        "assets/placeholderComrade5.jpeg",
        "This laptop is heavy enough to kill people",
        "16:56"),
      new Dialog(
        "Wolf",
        "assets/placeholderComrade6.jpeg",
        "Check out my github, it's all there",
        "14:02")
    ]);
  }
}
