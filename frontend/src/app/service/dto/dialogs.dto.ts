import {Dialog, Dialogs} from "../../domain/dialog";

export class DialogsResponse {
  constructor(public dialogs: DialogResponse[]) {}

  static toDomain(response: DialogsResponse): Dialogs {
    return new Dialogs(response.dialogs.map(dialog => DialogResponse.toDomain(dialog)));
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
}