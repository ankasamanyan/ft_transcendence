import {Injectable} from '@nestjs/common';
import {Message} from "../domain/message";
import {SelectedDialog} from "../domain/selected-dialog";

@Injectable()
export class DialogService {
  dialogs: SelectedDialog[] = [
    new SelectedDialog([
    new Message(
      "Anahit",
      "Cedric",
      "I am done, I can't, this Windows is destroying my soul, I'm telling ya",
      new Date(2024, 0, 30, 9, 5)),
    new Message(
      "Cedric",
      "Anahit",
      "Practice makes perfect",
        new Date(2024, 0, 30, 9, 16)),
    new Message(
      "Anahit",
      "Cedric",
      "Yeah, no, I don't want to excel in suffering, thank you very much",
        new Date(2024, 0, 30, 9, 17)),
    new Message(
      "Cedric",
      "Anahit",
      "C'mon, you are finally getting paid to code, just power through",
        new Date(2024, 0, 30, 9, 19)),
    new Message(
      "Cedrik",
      "Anahit",
      "What are our lunch plans?",
        new Date(2024, 0, 30, 9, 24)),
    new Message(
      "Anahit",
      "Cedric",
      "I need cookies👉👈",
        new Date(2024, 0, 30, 9, 25)),
  ]),
    new SelectedDialog([
      new Message(
        "Anahit",
        "Tania",
        "Я устала🥺 Halp",
          new Date(2024, 0, 29, 22, 2)),
      new Message(
        "Tania",
        "Anahit",
        "Открываем свою пекарню?",
          new Date(2024, 0, 29, 22, 5)),
      new Message(
        "Anahit",
        "Tania",
        "Да🥹",
          new Date(2024, 0, 29, 22, 10)),
      new Message(
        "Tania",
        "Anahit",
        "Можно еще французскую кафешку🤔",
          new Date(2024, 0, 29, 22, 23)),
      new Message(
        "Tania",
        "Anahit",
        "Я такие супы буду готовить, мммммммм😌",
          new Date(2024, 0, 29, 22, 24)),
      new Message(
        "Tania",
        "Anahit",
        "А какие блинчики!!!",
          new Date(2024, 0, 29, 22, 25)),
      new Message(
        "Anahit",
        "Tania",
        "Deal🤝",
          new Date(2024, 0, 29, 22, 27)),
    ]),
    new SelectedDialog([
      new Message(
        "Anahit",
        "Krisi",
        "Maybe you could take a short break? We could grab something to eat or just meet at 42. No need to exert yourself",
          new Date(2024, 0, 29, 18, 50)),
      new Message(
        "Krisi",
        "Anahit",
        "Well, yeah, having no breaks might prove to be challenging",
          new Date(2024, 0, 29, 18, 52)),
      new Message(
        "Krisi",
        "Anahit",
        "You think I won't manage?🤔",
          new Date(2024, 0, 29, 18, 54)),
      new Message(
        "Anahit",
        "Krisi",
        "I don't know, it does sound rather exhausting",
          new Date(2024, 0, 29, 19, 3)),
      new Message(
        "Anahit",
        "Krisi",
        "You really think you can go all day long?",
          new Date(2024, 0, 29, 19, 4)),
      new Message(
        "Krisi",
        "Anahit",
        "That's what she said",
          new Date(2024, 0, 29, 19, 7)),
    ]),
    new SelectedDialog([
      new Message(
        "Santiago",
        "Anahit",
        "I understand you position and share your concerns. " +
        "Yet I have a few points I want to make.\n\n" +
        "Firstly, I believe in trying to make the best out of the situation you find yourself in. " +
        "It shows one's ability to accommodate to the situation, deal with problems and be flexible when the circumstances demand it. " +
        "There is a possibility that the managers listening to our presentations share this point of view.\n\n" +
        "Secondly, we will be able to bring necessary changes to this place once we have a contract. " +
        "So you won't be ignoring the problems of our organization, I just suggest you postpone addressing them.\n\n" +
        "I genuinely want you to succeed and that's why I share my perspective. The decision on how to proceed further is yours, of course.",
          new Date(2024, 0, 29, 18, 1)),
      new Message(
        "Anahit",
        "Santiago",
        "🐱",
          new Date(2024, 0, 29, 18, 45)),
    ]),
    new SelectedDialog([
      new Message(
        "Fedia",
        "Anahit",
        "Так и я про то. Если корпоратив не заканчивается приглашением твоего друга на интервью, то это не пойми что, а не корпоратив",
          new Date(2024, 0, 29, 15, 57)),
      new Message(
        "Anahit",
        "Fedia",
        "😂😂😂",
          new Date(2024, 0, 29, 16, 6)),
      new Message(
        "Anahit",
        "Fedia",
        "Достойный результат!👏👏👏",
          new Date(2024, 0, 29, 16, 8)),
      new Message(
        "Anahit",
        "Fedia",
        "Пуне и Юля тоже прошли, насколько я помню?",
          new Date(2024, 0, 29, 16, 11)),
      new Message(
        "Fedia",
        "Anahit",
        "Да, компания собирается хорошая)",
          new Date(2024, 0, 29, 16, 13)),
    ]),
    new SelectedDialog([
      new Message(
        "Wolf",
        "Anahit",
        "We have React and your team is using Angular. Honestly, I can't see how that could work",
          new Date(2024, 0, 29, 13, 14)),
      new Message(
        "Anahit",
        "Wolf",
        "That is an obstacle, but one we can overcome😇",
          new Date(2024, 0, 29, 13, 20)),
      new Message(
        "Wolf",
        "Anahit",
        "Another thing is organizing twice as many people to work together. That is challenging enough with the amount of people we currently have",
          new Date(2024, 0, 29, 13, 31)),
      new Message(
        "Anahit",
        "Wolf",
        "True. That would resemble working on a real-life project more closely though, could be useful",
          new Date(2024, 0, 29, 13, 32)),
      new Message(
        "Anahit",
        "Wolf",
        "Tania is concerned with that as well, but she does not mind trying it out",
          new Date(2024, 0, 29, 13, 34)),
      new Message(
        "Wolf",
        "Anahit",
        "Okay, I'll run it by my team, but it's a highly, highly unlikely scenario",
          new Date(2024, 0, 29, 14, 2)),
    ])];
  getDialog(senderId: string, receiverId: string) {
    return this.dialogs.find(dialog => dialog.messageHistory.some(
      message => message.receiverId === receiverId)
    );
  }
}
