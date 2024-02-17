import {User} from "./user";

export class Channels {
    channels: Channel[];

    constructor(channels: Channel[]) {
        this.channels = channels;
    }
}

export class Channel {
    public name: string;
    public picture: string;
    public createdAt: Date;
    public id: number | undefined;
    public type: string | undefined;
    public participants: User[] | undefined;
    public owner: User | undefined;
    public admins: User[] | undefined;
    public lastMessage: string | undefined;
    public lastMessageCreatedAt: Date | undefined;
    public password: string | undefined;

    constructor(
        name: string,
        picture: string,
        createdAt: Date,
        id?: number,
        type?: string,
        participants?: User[],
        owner?: User,
        admins?: User[],
        lastMessage?: string,
        lastMessageCreatedAt?: Date,
        password?: string
    ) {
        this.name = name;
        this.picture = picture;
        this.createdAt = createdAt;
        this.id = id;
        this.type = type;
        this.participants = participants;
        this.owner = owner;
        this.admins = admins;
        this.lastMessage = lastMessage;
        this.lastMessageCreatedAt = lastMessageCreatedAt;
        this.password = password;
    }
}
