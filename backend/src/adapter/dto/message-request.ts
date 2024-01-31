import {Message} from "../../domain/message";

export class MessageRequest {
  constructor(
    public senderId: string,
    public receiverId: string,
    public text: string,
    public date: Date
  ) {
  }

  static toDomain(request: MessageRequest): Message {
    return new Message(
      request.senderId,
      request.receiverId,
      request.text,
      request.date
    );
  }
}