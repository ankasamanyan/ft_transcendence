import {User} from "./user";

export class Dialogs {
  dialogs: Dialog[];
  constructor(dialogs: Dialog[]) {
   this.dialogs = dialogs;
  }
}

export class Dialog {
  public user: User;
  public lastMessage: string;
  public lastMessageDate: Date;
  constructor(user: User, lastMessage: string, lastMessageDate: Date) {
    this.user = user;
    this.lastMessage = lastMessage;
    this.lastMessageDate = lastMessageDate;
  }
}
