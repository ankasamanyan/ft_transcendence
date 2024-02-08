import {User} from "../../domain/user";
import {Channel} from "../../domain/channel";

export class ChannelRequest {
  constructor(
      public name: string,
      public type: string,
      public participants: User[],
      public id?: number,
      public password?: string,
      public owner?: User,
      public admins?: User[],
      public lastMessage?: string,
      public lastMessageCreatedAt?: Date)
  {}

  static toDomain(request: ChannelRequest): Channel {
    return new Channel(
        request.name,
        request.type,
        request.participants,
        request.id,
        request.password,
        request.owner,
        request.admins,
        request.lastMessage,
        request.lastMessageCreatedAt
    );
  }

  static fromDomain(channel: Channel): ChannelRequest {
    return new ChannelRequest(
        channel.name,
        channel.type,
        channel.participants,
        channel.id,
        channel.password,
        channel.owner,
        channel.admins,
        channel.lastMessage,
        channel.lastMessageCreatedAt
    );
  }
}