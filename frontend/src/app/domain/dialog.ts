export class Dialog {
  public pictureUrl: string | undefined;
  public name: string | undefined;
  public lastMessage: string | undefined;
  public lastMessageTime: string | undefined;
  constructor(name: string, pictureUrl: string, lastMessage: string, lastMessageTime: string) {
    this.name = name;
    this.pictureUrl = pictureUrl;
    this.lastMessage = lastMessage;
    this.lastMessageTime = lastMessageTime;
  }
}
