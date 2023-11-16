export class Message {
  public text: string | undefined;
  public userId: string | undefined;
  public time: string | undefined;
  constructor(text: string, userId: string, time: string) {
    this.text = text;
    this.userId = userId;
    this.time = time;
  }

}
