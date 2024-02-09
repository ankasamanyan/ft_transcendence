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