export class Dialog {
  public pictureUrl: string | undefined;
  public name: string | undefined;
  public lastMessage: string | undefined;
  public lastMessageTime: string | undefined;
  constructor(name: string, pictureUrl: string, lastMessage: string, lastMessageTime: string) {
    this.name = name;
    this.pictureUrl = pictureUrl;
    this.lastMessage = this.formatMessage(lastMessage);
    this.lastMessageTime = lastMessageTime;
  }

  formatMessage(message: string) {
    let formattedMessage = message.substring(0, 25);
    if (message.length > 24)
        return formattedMessage + "...";
    return formattedMessage;
  }
}
