import { Component } from '@angular/core';
import {SelectedDialog} from "../../domain/selected-dialog";
import {Message} from "../../domain/message";
import {DialogService} from "../../service/dialog.service";

@Component({
  selector: 'app-selected-dialog',
  templateUrl: './selected-dialog.component.html',
  styleUrls: ['./selected-dialog.component.css']
})
export class SelectedDialogComponent {

  selectedDialog: SelectedDialog | undefined;
  constructor(dialogService: DialogService) {
    dialogService.getDialog("Anahit", "Cedric").subscribe((value: SelectedDialog)  => {
      this.selectedDialog = value;
    });
  }
}
