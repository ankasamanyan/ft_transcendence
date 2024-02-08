import {User} from "./user";

export class Channel {
    public id: number | undefined;
    public name: string;
    public type: string;
    public participants: User[];
    public password: string | undefined;
    public owner: User | undefined;
    public admins: User[] | undefined;
    public lastMessage: string | undefined;
    public lastMessageCreatedAt: Date | undefined;

    constructor(
                name: string,
                type: string,
                participants: User[],
                id?: number,
                password?: string,
                owner?: User,
                admins?: User[],
                lastMessage?: string,
                lastMessageCreatedAt?: Date
    ) {
        this.name = name;
        this.type = type;
        this.participants = participants;
        this.id = id;
        this.password = password;
        this.owner = owner;
        this.admins = admins;
        this.lastMessage = lastMessage;
        this.lastMessageCreatedAt = lastMessageCreatedAt;
    }
}
