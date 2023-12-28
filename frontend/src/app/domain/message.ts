export class Message {
  public senderId: string | undefined;
  public receiverId: string | undefined;
  public text: string | undefined;
  public time: string | undefined;
  constructor(senderId: string, receiverId: string, text: string, time: string) {
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.text = text;
    this.time = time;
  }
}
