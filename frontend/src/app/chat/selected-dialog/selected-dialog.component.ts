import { Component } from '@angular/core';
import {SelectedDialog} from "../../model/SelectedDialog";
import {Message} from "../../model/Message";

@Component({
  selector: 'app-selected-dialog',
  templateUrl: './selected-dialog.component.html',
  styleUrls: ['./selected-dialog.component.css']
})
export class SelectedDialogComponent {
  selectedPerson: string = "Cedric";
  selectedDialog: SelectedDialog = new SelectedDialog([
    new Message("I am done, I can't, this Windows is destroying my soul, I'm telling ya",
      "Anahit",
      "9.05"),
    new Message("Practice makes perfect",
      "Cedric",
      "9.16"),
    new Message("Yeah, no, I don't want to excel in suffering, thank you very much",
      "Anahit",
      "9.17"),
    new Message("C'mon, you are finally getting paid to code, just power through",
      "Cedric",
      "9.19"),
    new Message("What are our lunch plans?",
      "Cedrik",
      "9.24"),
    new Message("I need cookies👉👈",
      "Anahit",
      "9.25"),
  ]);
}
