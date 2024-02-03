export class Message {
  public senderId: number;
  public receiverId: number;
  public text: string;
  public date: Date;
  constructor(senderId: number, receiverId: number, text: string, date: Date) {
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.text = text;
    this.date = date;
  }
}
