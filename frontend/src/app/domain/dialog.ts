export class Dialogs {
  dialogs: Dialog[] | undefined;
  constructor(dialogs: Dialog[]) {
   this.dialogs = dialogs;
  }
}

export class Dialog {
  public pictureUrl: string;
  public name: string;
  public lastMessage: string;
  public lastMessageDate: Date;

  constructor(name: string, pictureUrl: string, lastMessage: string, lastMessageDate: Date) {
    this.name = name;
    this.pictureUrl = pictureUrl;
    this.lastMessage = lastMessage;
    this.lastMessageDate = lastMessageDate;
  }
}
