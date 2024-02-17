import {User} from "../../domain/user";
import {ChannelUpdate} from "../../domain/channel-update";

export class ChannelUpdateRequest {
  constructor(public channelId: number, public users: User[]) {

  }

  static toDomain(request: ChannelUpdateRequest): ChannelUpdate {
    return new ChannelUpdate(
      request.channelId,
      request.users
    );
  }

  static fromDomain(channelUpdate: ChannelUpdate): ChannelUpdateRequest {
    return new ChannelUpdateRequest(
      channelUpdate.channelId,
      channelUpdate.users
    );
  }
}