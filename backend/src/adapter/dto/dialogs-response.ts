import {Dialog, Dialogs} from "../../domain/dialog";
import {User} from "../../domain/user";

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
    public user: User,
    public pictureUrl: string,
    public lastMessage: string,
    public lastMessageDate: Date
  ) {}

  static toDomain(response: DialogResponse): Dialog {
    return new Dialog(
      response.user,
      response.pictureUrl,
      response.lastMessage,
      response.lastMessageDate
    );
  }

  static fromDomain(dialog: Dialog): DialogResponse {
    return new DialogResponse(
      dialog.user,
      dialog.pictureUrl,
      dialog.lastMessage,
      dialog.lastMessageDate
    );
  }
}