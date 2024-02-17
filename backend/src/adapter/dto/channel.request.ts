import {User} from "../../domain/user";
import {Channel} from "../../domain/channel";

export class ChannelRequest {
  constructor(
    public name: string,
    public picture: string,
    public createdAt: Date,
    public id?: number,
    public type?: string,
    public participants?: User[],
    public owner?: User,
    public admins?: User[],
    public lastMessage?: string,
    public lastMessageCreatedAt?: Date,
    public password?: string) {
  }

  static toDomain(request: ChannelRequest): Channel {
    return new Channel(
      request.name,
      request.picture,
      request.createdAt,
      request.id,
      request.type,
      request.participants,
      request.owner,
      request.admins,
      request.lastMessage,
      request.lastMessageCreatedAt,
      request.password
    );
  }

  static fromDomain(channel: Channel): ChannelRequest {
    return new ChannelRequest(
      channel.name,
      channel.picture,
      channel.createdAt,
      channel.id,
      channel.type,
      channel.participants,
      channel.owner,
      channel.admins,
      channel.lastMessage,
      channel.lastMessageCreatedAt,
      channel.password
    );
  }
}