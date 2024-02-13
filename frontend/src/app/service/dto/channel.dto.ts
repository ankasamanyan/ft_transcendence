import {User} from "../../domain/user";
import {Channel, Channels} from "../../domain/channel";

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

export class ChannelsResponse {
  constructor(public channels: ChannelResponse[]) {
  }

  static toDomain(response: ChannelsResponse): Channels {
    return new Channels(response.channels.map(channel => ChannelResponse.toDomain(channel)));
  }

  static fromDomain(channels: Channels): ChannelsResponse {
    return new ChannelsResponse(channels.channels.map(channel => ChannelResponse.fromDomain(channel)));
  }
}

export class ChannelResponse {
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

  static toDomain(response: ChannelResponse): Channel {
    return new Channel(
      response.name,
      response.picture,
      response.createdAt,
      response.id,
      response.type,
      response.participants,
      response.owner,
      response.admins,
      response.lastMessage,
      response.lastMessageCreatedAt,
      response.password
    );
  }

  static fromDomain(channel: Channel): ChannelResponse {
    return new ChannelResponse(
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