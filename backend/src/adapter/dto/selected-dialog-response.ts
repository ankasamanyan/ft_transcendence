import {SelectedDialog} from "../../domain/selected-dialog";
import {Message} from "../../domain/message";

export class SelectedDialogResponse {
  constructor(public messageHistory: MessageResponse[]) {}

  static toDomain(response: SelectedDialogResponse): SelectedDialog {
    return new SelectedDialog(response.messageHistory.map(message => MessageResponse.toDomain(message)));
  }

  static fromDomain(dialog: SelectedDialog): SelectedDialogResponse {
    return new SelectedDialogResponse(dialog.messageHistory.map(message => MessageResponse.fromDomain(message)));
  }
}

export class MessageResponse {
  constructor(
    public senderId: string,
    public receiverId: string,
    public text: string,
    public time: string
  ) {}

  static toDomain(response: MessageResponse): Message {
    return new Message(
      response.senderId,
      response.receiverId,
      response.text,
      response.time
    );
  }

  static fromDomain(message: Message): MessageResponse {
    return new MessageResponse(
      message.senderId,
      message.receiverId,
      message.text,
      message.time
    );
  }
}