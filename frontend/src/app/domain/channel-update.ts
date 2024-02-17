import {User} from "./user";

export class ChannelUpdate {
    public channelId: number;
    public users: User[];

    constructor(channelId: number, users: User[]) {
        this.channelId = channelId;
        this.users = users;
    }
}
