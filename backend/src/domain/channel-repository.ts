import {Users} from "./user";

export interface ChannelRepository {
    createChannel(users: Users);
}