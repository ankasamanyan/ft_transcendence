export class ChannelMessage {
  public channel_id: number;
  public senderId: number;
  public text: string;
  public created_at: Date;
  constructor(channel_id: number, senderId: number, text: string, created_at: Date) {
    this.channel_id = channel_id;
    this.senderId = senderId;
    this.text = text;
    this.created_at = created_at;
  }
}
