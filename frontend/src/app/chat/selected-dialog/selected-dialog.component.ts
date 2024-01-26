import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SelectedDialog} from "../../domain/selected-dialog";
import {DialogService} from "../../service/dialog.service";

@Component({
  selector: 'app-selected-dialog',
  templateUrl: './selected-dialog.component.html',
  styleUrls: ['./selected-dialog.component.css']
})
export class SelectedDialogComponent implements OnChanges{
  @Input()
  selectedPerson: string | undefined;

  selectedDialog: SelectedDialog | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedPerson) {
      this.dialogService.getDialog("Anahit", this.selectedPerson).subscribe((value: SelectedDialog) => {
        this.selectedDialog = value;
      });
    }
  }
  constructor(public dialogService: DialogService) {
  }
}
