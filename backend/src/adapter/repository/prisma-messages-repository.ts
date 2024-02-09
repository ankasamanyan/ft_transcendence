import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {ChannelMessage} from "../../domain/channel-message";
import {ChannelMessageResponse} from "../dto/channel-message-response";

@Injectable()
export class PrismaMessagesRepository {
    constructor(private prisma: PrismaService) {

    }

    async getChannelMessages(channelId: number) {
        const messages = await this.prisma.channelMessage.findMany({
            where: {
                channel_id: Number(channelId)
            }
        });
        return messages.map((message) => {
                return new ChannelMessageResponse(
                    message.channel_id,
                    message.sender_id,
                    message.text,
                    message.created_at)});
    }

    async saveChannelMessage(message: ChannelMessage) {
        await this.prisma.channelMessage.create({
            data: {
                channel_id: Number(message.channel_id),
                sender_id: Number(message.senderId),
                text: message.text,
                created_at: message.created_at
            }}
        );
    }

    async initializeChannelMessages() {
        if (await this.prisma.channelMessage.count() === 0) {
            await this.prisma.channelMessage.createMany({
                data: [
                    {
                        channel_id: 1,
                        sender_id: 1,
                        text: "I am done, I can't, this Windows is destroying my soul, I'm telling ya",
                        created_at: new Date(2024, 0, 30, 9, 5)
                    },
                    {
                        channel_id: 1,
                        sender_id: 3,
                        text: "Practice makes perfect",
                        created_at: new Date(2024, 0, 30, 9, 16)
                    },
                    {
                        channel_id: 1,
                        sender_id: 1,
                        text: "Yeah, no, I don't want to excel in suffering, thank you very much",
                        created_at: new Date(2024, 0, 30, 9, 17)
                    },
                    {
                        channel_id: 1,
                        sender_id: 3,
                        text: "C'mon, you are finally getting paid to code, just power through",
                        created_at: new Date(2024, 0, 30, 9, 19)
                    },
                    {
                        channel_id: 1,
                        sender_id: 3,
                        text: "What are our lunch plans?",
                        created_at: new Date(2024, 0, 30, 9, 24)
                    },
                    {
                        channel_id: 1,
                        sender_id: 1,
                        text: "I need cookies👉👈",
                        created_at: new Date(2024, 0, 30, 9, 25)
                    },
                    {
                        channel_id: 2,
                        sender_id: 1,
                        text: "Я устала🥺 Halp",
                        created_at: new Date(2024, 0, 29, 22, 2)
                    },
                    {
                        channel_id: 2,
                        sender_id: 2,
                        text: "Открываем свою пекарню?",
                        created_at: new Date(2024, 0, 29, 22, 5)
                    },
                    {
                        channel_id: 2,
                        sender_id: 1,
                        text: "Да🥹",
                        created_at: new Date(2024, 0, 29, 22, 10)
                    },
                    {
                        channel_id: 2,
                        sender_id: 2,
                        text: "Можно еще французскую кафешку🤔",
                        created_at: new Date(2024, 0, 29, 22, 23)
                    },
                    {
                        channel_id: 2,
                        sender_id: 2,
                        text: "Я такие супы буду готовить, мммммммм😌",
                        created_at: new Date(2024, 0, 29, 22, 24)
                    },
                    {
                        channel_id: 2,
                        sender_id: 2,
                        text: "А какие блинчики!!!",
                        created_at: new Date(2024, 0, 29, 22, 25)
                    },
                    {
                        channel_id: 2,
                        sender_id: 1,
                        text: "Deal🤝",
                        created_at: new Date(2024, 0, 29, 22, 27)
                    },
                    {
                        channel_id: 3,
                        sender_id: 1,
                        text: "Maybe you could take a short break? We could grab something to eat or just meet at 42. No need to exert yourself",
                        created_at: new Date(2024, 0, 29, 18, 50)
                    },
                    {
                        channel_id: 3,
                        sender_id: 4,
                        text: "Well, yeah, having no breaks might prove to be challenging",
                        created_at: new Date(2024, 0, 29, 18, 52)
                    },
                    {
                        channel_id: 3,
                        sender_id: 4,
                        text: "You think I won't manage?🤔",
                        created_at: new Date(2024, 0, 29, 18, 54)
                    },
                    {
                        channel_id: 3,
                        sender_id: 1,
                        text: "I don't know, it does sound rather exhausting",
                        created_at: new Date(2024, 0, 29, 19, 3)
                    },
                    {
                        channel_id: 3,
                        sender_id: 1,
                        text: "You really think you can go all day long?",
                        created_at: new Date(2024, 0, 29, 19, 4)
                    },
                    {
                        channel_id: 3,
                        sender_id: 4,
                        text: "That's what she said",
                        created_at: new Date(2024, 0, 29, 19, 7)
                    },
                    {
                        channel_id: 4,
                        sender_id: 5,
                        text: "I understand you position and share your concerns. " +
                            "Yet I have a few points I want to make.\n\n" +
                            "Firstly, I believe in trying to make the best out of the situation you find yourself in. " +
                            "It shows one's ability to accommodate to the situation, deal with problems and be flexible when the circumstances demand it. " +
                            "There is a possibility that the managers listening to our presentations share this point of view.\n\n" +
                            "Secondly, we will be able to bring necessary changes to this place once we have a contract. " +
                            "So you won't be ignoring the problems of our organization, I just suggest you postpone addressing them.\n\n" +
                            "I genuinely want you to succeed and that's why I share my perspective. The decision on how to proceed further is yours, of course.",
                        created_at: new Date(2024, 0, 29, 18, 1)
                    },
                    {
                        channel_id: 4,
                        sender_id: 1,
                        text: "🐱",
                        created_at: new Date(2024, 0, 29, 18, 45)
                    },
                    {
                        channel_id: 5,
                        sender_id: 6,
                        text: "Так и я про то. Если корпоратив не заканчивается приглашением твоего друга на интервью, то это не пойми что, а не корпоратив",
                        created_at: new Date(2024, 0, 29, 15, 57)
                    },
                    {
                        channel_id: 5,
                        sender_id: 1,
                        text: "😂😂😂",
                        created_at: new Date(2024, 0, 29, 16, 6)
                    },
                    {
                        channel_id: 5,
                        sender_id: 1,
                        text: "Достойный результат!👏👏👏",
                        created_at: new Date(2024, 0, 29, 16, 8)
                    },
                    {
                        channel_id: 5,
                        sender_id: 1,
                        text: "Пуне и Юля тоже прошли, насколько я помню?",
                        created_at: new Date(2024, 0, 29, 16, 11)
                    },
                    {
                        channel_id: 5,
                        sender_id: 6,
                        text: "Да, компания собирается хорошая)",
                        created_at: new Date(2024, 0, 29, 16, 13)
                    },
                    {
                        channel_id: 6,
                        sender_id: 7,
                        text: "We have React and your team is using Angular. Honestly, I can't see how that could work",
                        created_at: new Date(2024, 0, 29, 13, 14)
                    },
                    {
                        channel_id: 6,
                        sender_id: 1,
                        text: "That is an obstacle, but one we can overcome😇",
                        created_at: new Date(2024, 0, 29, 13, 20)
                    },
                    {
                        channel_id: 6,
                        sender_id: 7,
                        text: "Another thing is organizing twice as many people to work together. That is challenging enough with the amount of people we currently have",
                        created_at: new Date(2024, 0, 29, 13, 31)
                    },
                    {
                        channel_id: 6,
                        sender_id: 1,
                        text: "True. That would resemble working on a real-life project more closely though, could be useful",
                        created_at: new Date(2024, 0, 29, 13, 32)
                    },
                    {
                        channel_id: 6,
                        sender_id: 1,
                        text: "Tania is concerned with that as well, but she does not mind trying it out",
                        created_at: new Date(2024, 0, 29, 13, 34)
                    },
                    {
                        channel_id: 6,
                        sender_id: 7,
                        text: "Okay, I'll run it by my team, but it's a highly, highly unlikely scenario",
                        created_at: new Date(2024, 0, 29, 14, 2)
                    },
                ]
            });
        }
    }
}