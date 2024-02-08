import {User} from "../../domain/user";
import {Channel} from "../../domain/channel";

export class ChannelDto {
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

  static toDomain(request: ChannelDto): Channel {
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

  static fromDomain(channel: Channel): ChannelDto {
    return new ChannelDto(
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