import {Message} from "./Message";

export class SelectedDialog {
  public messageHistory: Message[] | undefined
  constructor(messageHistory: Message[]) {
    this.messageHistory = messageHistory;
  }
}
