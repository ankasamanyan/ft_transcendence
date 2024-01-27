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
      "9.05"),
    new Message(
      "Cedric",
      "Anahit",
      "Practice makes perfect",
      "9.16"),
    new Message(
      "Anahit",
      "Cedric",
      "Yeah, no, I don't want to excel in suffering, thank you very much",
      "9.17"),
    new Message(
      "Cedric",
      "Anahit",
      "C'mon, you are finally getting paid to code, just power through",
      "9.19"),
    new Message(
      "Cedrik",
      "Anahit",
      "What are our lunch plans?",
      "9.24"),
    new Message(
      "Anahit",
      "Cedric",
      "I need cookies👉👈",
      "9.25"),
  ]),
    new SelectedDialog([
      new Message(
        "Anahit",
        "Tania",
        "Я устала🥺 Halp",
        "22.02"),
      new Message(
        "Tania",
        "Anahit",
        "Открываем свою пекарню?",
        "22.05"),
      new Message(
        "Anahit",
        "Tania",
        "Да🥹",
        "22.10"),
      new Message(
        "Tania",
        "Anahit",
        "Можно еще французскую кафешку🤔",
        "22.23"),
      new Message(
        "Tania",
        "Anahit",
        "Я такие супы буду готовить, мммммммм😌",
        "22.24"),
      new Message(
        "Tania",
        "Anahit",
        "А какие блинчики!!!",
        "22.25"),
      new Message(
        "Anahit",
        "Tania",
        "Deal🤝",
        "22.27")
    ]),
    new SelectedDialog([
      new Message(
        "Anahit",
        "Krisi",
        "Maybe you could take a short break? We could grab something to eat or just meet at 42. No need to exert yourself",
        "18.50"),
      new Message(
        "Krisi",
        "Anahit",
        "Well, yeah, having no breaks might prove to be challenging",
        "18.52"),
      new Message(
        "Krisi",
        "Anahit",
        "You think I won't manage?🤔",
        "18.54"),
      new Message(
        "Anahit",
        "Krisi",
        "I don't know, it does sound rather exhausting",
        "19.03"),
      new Message(
        "Anahit",
        "Krisi",
        "You really think you can go all day long?",
        "19.04"),
      new Message(
        "Krisi",
        "Anahit",
        "That's what she said",
        "19.07")
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
        "18.01"),
      new Message(
        "Anahit",
        "Santiago",
        "🐱",
        "18.45")
    ])];
  getDialog(senderId: string, receiverId: string) {
    return this.dialogs.find(dialog => dialog.messageHistory.some(
      message => message.receiverId === receiverId)
    );
  }
}
