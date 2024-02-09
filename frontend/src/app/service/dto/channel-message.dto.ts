import {ChannelMessage} from "../../domain/channel-message";

export class ChannelMessageResponse {
    constructor(
        public channel_id: number,
        public senderId: number,
        public text: string,
        public created_at: Date
    ) {
    }

    static toDomain(request: ChannelMessageResponse): ChannelMessage {
        return new ChannelMessage(
            request.channel_id,
            request.senderId,
            request.text,
            request.created_at
        );
    }
}

export class ChannelMessageRequest {
    constructor(
        public channel_id: number,
        public senderId: number,
        public text: string,
        public created_at: Date
    ) {
    }

    static toDomain(request: ChannelMessageRequest): ChannelMessage {
        return new ChannelMessage(
            request.channel_id,
            request.senderId,
            request.text,
            request.created_at
        );
    }

    static fromDomain(message: ChannelMessage): ChannelMessageRequest {
        return new ChannelMessageRequest(
            message.channel_id,
            message.senderId,
            message.text,
            message.created_at
        );
    }
}