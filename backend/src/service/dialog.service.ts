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
    ])];
  getDialog(senderId: string, receiverId: string) {
    return this.dialogs.find(dialog => dialog.messageHistory.some(
      message => message.receiverId === receiverId)
    );
  }
}
