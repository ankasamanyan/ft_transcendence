export class Message {
  public senderId: string;
  public receiverId: string;
  public text: string;
  public date: Date;
  constructor(senderId: string, receiverId: string, text: string, date: Date) {
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.text = text;
    this.date = date;
  }
}
