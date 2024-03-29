import {Dialog, Dialogs} from "../../domain/dialog";
import {User} from "../../domain/user";

export class DialogsResponse {
  constructor(public dialogs: DialogResponse[]) {}

  static toDomain(response: DialogsResponse): Dialogs {
    return new Dialogs(response.dialogs.map(dialog => DialogResponse.toDomain(dialog)));
  }
}

export class DialogResponse {
  constructor(
    public user: User,
    public lastMessage: string,
    public lastMessageDate: Date
  ) {}

  static toDomain(response: DialogResponse): Dialog {
    return new Dialog(
      response.user,
      response.lastMessage,
      response.lastMessageDate
    );
  }
}