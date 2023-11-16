import {Component} from '@angular/core';
import {Dialog} from "../../model/Dialog";

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent {
  dialogs: Dialog[] = [
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
      "So, I am curious: have you ever...",
      "19:04"),
    new Dialog(
      "Santiago",
      "assets/placeholderComrade4.jpeg",
      "Trying to reboot yet again, honestly...",
      "18:45"),
    new Dialog(
      "Fedia",
      "assets/placeholderComrade5.jpeg",
      "This laptop is heavy enough to kill people",
      "16:56"),
    new Dialog(
      "Wolf",
      "assets/placeholderComrade6.jpeg",
      "Just check my github, it's all there",
      "14:02")
  ];
}
