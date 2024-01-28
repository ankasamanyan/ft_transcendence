import {Message} from "../domain/message";

export class MessageRequest {
  constructor(
    public senderId: string,
    public receiverId: string,
    public text: string,
    public time: string
  ) {
  }

  static toDomain(request: MessageRequest): Message {
    return new Message(
      request.senderId,
      request.receiverId,
      request.text,
      request.time
    );
  }
}