import { Dialog, Dialogs } from "./dialog";

export class DialogsResponse {
  constructor(public dialogs: DialogResponse[]) {}

  static toDomain(response: DialogsResponse): Dialogs {
    return new Dialogs(response.dialogs.map(dialog => DialogResponse.toDomain(dialog)));
  }

  static fromDomain(dialogs: Dialogs): DialogsResponse {
    return new DialogsResponse(dialogs.dialogs.map(dialog => DialogResponse.fromDomain(dialog)))
  }
}

export class DialogResponse {
  constructor(
    public name: string,
    public pictureUrl: string,
    public lastMessage: string,
    public lastMessageTime: string
  ) {}

  static toDomain(response: DialogResponse): Dialog {
    return new Dialog(
      response.name,
      response.pictureUrl,
      response.lastMessage,
      response.lastMessageTime
    );
  }

  static fromDomain(dialog: Dialog): DialogResponse {
    return new DialogResponse(
      dialog.name,
      dialog.pictureUrl,
      dialog.lastMessage,
      dialog.lastMessageTime
    );
  }
}