import {User} from "./user";

export class Dialogs {
  dialogs: Dialog[];
  constructor(dialogs: Dialog[]) {
   this.dialogs = dialogs;
  }
}

export class Dialog {
  public user: User;
  public pictureUrl: string;
  public lastMessage: string;
  public lastMessageDate: Date;
  constructor(user: User, pictureUrl: string, lastMessage: string, lastMessageDate: Date) {
    this.user = user;
    this.pictureUrl = pictureUrl;
    this.lastMessage = lastMessage;
    this.lastMessageDate = lastMessageDate;
  }
}
