export class Message {
  public senderId: string;
  public receiverId: string;
  public text: string;
  public time: string;
  constructor(senderId: string, receiverId: string, text: string, time: string) {
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.text = text;
    this.time = time;
  }
}
