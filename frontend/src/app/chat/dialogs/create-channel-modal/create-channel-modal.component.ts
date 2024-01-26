import {Component, EventEmitter, Output} from '@angular/core';
import {Dialog} from "../../../domain/dialog";

@Component({
  selector: 'app-create-channel-modal',
  templateUrl: './create-channel-modal.component.html',
  styleUrls: ['./create-channel-modal.component.css']
})
export class CreateChannelModalComponent {
  @Output()
  modalClose = new EventEmitter<void>();

  dialogs = [
    new Dialog(
      "Cedric",
      "assets/placeholderComrade2.jpeg",
      "I need cookies👉👈",
      "9.25"),
    new Dialog(
      "Tania",
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
