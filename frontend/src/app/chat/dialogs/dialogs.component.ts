import {Component} from '@angular/core';
import {Dialog} from "../../domain/dialog";

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent {
  dialogsScrollable: boolean = false;
  dialogs: Dialog[] = [];
  displayedDialogs: Dialog[] = [];

  constructor() {
    this.initializeDialogs();
  }
  makeDialogsScrollable() {
    this.dialogsScrollable = true;
  }

  makeDialogsStatic() {
    this.dialogsScrollable = false;
  }

  find(dialogToSearchFor: string) {
    if (dialogToSearchFor == "") {
      this.displayedDialogs = this.dialogs;
    } else {
      this.displayedDialogs = this.dialogs
        .filter((dialog) => dialog.name?.toUpperCase().startsWith(dialogToSearchFor.toUpperCase()));
    }
  }

  initializeDialogs() {
    this.dialogs = [
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
    this.displayedDialogs = this.dialogs;
  }
}
