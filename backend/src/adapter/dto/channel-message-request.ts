import {ChannelMessage} from "../../domain/channel-message";

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
}