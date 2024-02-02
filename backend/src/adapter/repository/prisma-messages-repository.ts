import {Message} from "../../domain/message";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaMessagesRepository {
    constructor(private prisma: PrismaService) {

    }

    getDialog(senderId: number, receiverId: number) {
    }

    save(message: Message) {
    }

    async initializeMessages() {
        if (await this.prisma.message.count() === 0) {
            await this.prisma.message.createMany({
                data: [
                    {
                        sender_id: 1,
                        receiver_id: 3,
                        text: "I am done, I can't, this Windows is destroying my soul, I'm telling ya",
                        time: new Date(2024, 0, 30, 9, 5)
                    },
                    {
                        sender_id: 3,
                        receiver_id: 1,
                        text: "Practice makes perfect",
                        time: new Date(2024, 0, 30, 9, 16)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 3,
                        text: "Yeah, no, I don't want to excel in suffering, thank you very much",
                        time: new Date(2024, 0, 30, 9, 17)
                    },
                    {
                        sender_id: 3,
                        receiver_id: 1,
                        text: "C'mon, you are finally getting paid to code, just power through",
                        time: new Date(2024, 0, 30, 9, 19)
                    },
                    {
                        sender_id: 3,
                        receiver_id: 1,
                        text: "What are our lunch plans?",
                        time: new Date(2024, 0, 30, 9, 24)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 3,
                        text: "I need cookies👉👈",
                        time: new Date(2024, 0, 30, 9, 25)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 2,
                        text: "Я устала🥺 Halp",
                        time: new Date(2024, 0, 29, 22, 2)
                    },
                    {
                        sender_id: 2,
                        receiver_id: 1,
                        text: "Открываем свою пекарню?",
                        time: new Date(2024, 0, 29, 22, 5)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 2,
                        text: "Да🥹",
                        time: new Date(2024, 0, 29, 22, 10)
                    },
                    {
                        sender_id: 2,
                        receiver_id: 1,
                        text: "Можно еще французскую кафешку🤔",
                        time: new Date(2024, 0, 29, 22, 23)
                    },
                    {
                        sender_id: 2,
                        receiver_id: 1,
                        text: "Я такие супы буду готовить, мммммммм😌",
                        time: new Date(2024, 0, 29, 22, 24)
                    },
                    {
                        sender_id: 2,
                        receiver_id: 1,
                        text: "А какие блинчики!!!",
                        time: new Date(2024, 0, 29, 22, 25)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 2,
                        text: "Deal🤝",
                        time: new Date(2024, 0, 29, 22, 27)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 4,
                        text: "Maybe you could take a short break? We could grab something to eat or just meet at 42. No need to exert yourself",
                        time: new Date(2024, 0, 29, 18, 50)
                    },
                    {
                        sender_id: 4,
                        receiver_id: 1,
                        text: "Well, yeah, having no breaks might prove to be challenging",
                        time: new Date(2024, 0, 29, 18, 52)
                    },
                    {
                        sender_id: 4,
                        receiver_id: 1,
                        text: "You think I won't manage?🤔",
                        time: new Date(2024, 0, 29, 18, 54)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 4,
                        text: "I don't know, it does sound rather exhausting",
                        time: new Date(2024, 0, 29, 19, 3)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 4,
                        text: "You really think you can go all day long?",
                        time: new Date(2024, 0, 29, 19, 4)
                    },
                    {
                        sender_id: 4,
                        receiver_id: 1,
                        text: "That's what she said",
                        time: new Date(2024, 0, 29, 19, 7)
                    },
                    {
                        sender_id: 5,
                        receiver_id: 1,
                        text: "I understand you position and share your concerns. " +
                            "Yet I have a few points I want to make.\n\n" +
                            "Firstly, I believe in trying to make the best out of the situation you find yourself in. " +
                            "It shows one's ability to accommodate to the situation, deal with problems and be flexible when the circumstances demand it. " +
                            "There is a possibility that the managers listening to our presentations share this point of view.\n\n" +
                            "Secondly, we will be able to bring necessary changes to this place once we have a contract. " +
                            "So you won't be ignoring the problems of our organization, I just suggest you postpone addressing them.\n\n" +
                            "I genuinely want you to succeed and that's why I share my perspective. The decision on how to proceed further is yours, of course.",
                        time: new Date(2024, 0, 29, 18, 1)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 5,
                        text: "🐱",
                        time: new Date(2024, 0, 29, 18, 45)
                    },
                    {
                        sender_id: 6,
                        receiver_id: 1,
                        text: "Так и я про то. Если корпоратив не заканчивается приглашением твоего друга на интервью, то это не пойми что, а не корпоратив",
                        time: new Date(2024, 0, 29, 15, 57)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 6,
                        text: "😂😂😂",
                        time: new Date(2024, 0, 29, 16, 6)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 6,
                        text: "Достойный результат!👏👏👏",
                        time: new Date(2024, 0, 29, 16, 8)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 6,
                        text: "Пуне и Юля тоже прошли, насколько я помню?",
                        time: new Date(2024, 0, 29, 16, 11)
                    },
                    {
                        sender_id: 6,
                        receiver_id: 1,
                        text: "Да, компания собирается хорошая)",
                        time: new Date(2024, 0, 29, 16, 13)
                    },
                    {
                        sender_id: 7,
                        receiver_id: 1,
                        text: "We have React and your team is using Angular. Honestly, I can't see how that could work",
                        time: new Date(2024, 0, 29, 13, 14)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 7,
                        text: "That is an obstacle, but one we can overcome😇",
                        time: new Date(2024, 0, 29, 13, 20)
                    },
                    {
                        sender_id: 7,
                        receiver_id: 1,
                        text: "Another thing is organizing twice as many people to work together. That is challenging enough with the amount of people we currently have",
                        time: new Date(2024, 0, 29, 13, 31)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 7,
                        text: "True. That would resemble working on a real-life project more closely though, could be useful",
                        time: new Date(2024, 0, 29, 13, 32)
                    },
                    {
                        sender_id: 1,
                        receiver_id: 7,
                        text: "Tania is concerned with that as well, but she does not mind trying it out",
                        time: new Date(2024, 0, 29, 13, 34)
                    },
                    {
                        sender_id: 7,
                        receiver_id: 1,
                        text: "Okay, I'll run it by my team, but it's a highly, highly unlikely scenario",
                        time: new Date(2024, 0, 29, 14, 2)
                    },
                ]
            });
        }
    }
}