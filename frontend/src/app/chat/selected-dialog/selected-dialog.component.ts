import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {SelectedDialog} from "../../domain/selected-dialog";
<<<<<<< HEAD
import {DialogService} from "../../service/dialog.service";
=======
import {Message} from "../../domain/message";
import { DialogService } from "../../service/dialog.service"
>>>>>>> Dockerization

@Component({
  selector: 'app-selected-dialog',
  templateUrl: './selected-dialog.component.html',
  styleUrls: ['./selected-dialog.component.css']
})
<<<<<<< HEAD
export class SelectedDialogComponent implements OnChanges, AfterViewChecked {
  @Input()
  selectedPerson: string | undefined;

  @ViewChild('wholeSelectedDialogContainer') private wholeSelectedDialogContainer!: ElementRef;

  selectedDialog: SelectedDialog | undefined;

  constructor(public dialogService: DialogService) {
=======
export class SelectedDialogComponent {
  mockData: SelectedDialog | undefined;

  constructor(dialogService: DialogService) {
    dialogService.getDialog("Heather", "Maria").subscribe((value: SelectedDialog)  => {this.mockData = value;});

  }
  selectedDialogScrollable: boolean = false;
  makeSelectedDialogScrollable() {
    this.selectedDialogScrollable = true;
>>>>>>> Dockerization
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedPerson) {
      this.dialogService.getDialog("Anahit", this.selectedPerson).subscribe((value: SelectedDialog) => {
        this.selectedDialog = value;
      });
    }
  }

  ngAfterViewChecked() {
    this.scrollToTheBottom();
  }

  scrollToTheBottom() {
    const container = this.wholeSelectedDialogContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
}
