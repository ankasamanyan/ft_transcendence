import {Injectable} from '@nestjs/common';
import {Message} from "../domain/message";
import {SelectedDialog} from "../domain/selected-dialog";

@Injectable()
export class DialogService {
  getDialog(senderId: string, receiverId: string) {
    return new SelectedDialog([
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
    ]);
  }
}
