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
import {DialogService} from "../../service/dialog.service";

@Component({
  selector: 'app-selected-dialog',
  templateUrl: './selected-dialog.component.html',
  styleUrls: ['./selected-dialog.component.css']
})
export class SelectedDialogComponent implements OnChanges, AfterViewChecked {
  @Input()
  selectedPerson: string | undefined;

  @ViewChild('wholeSelectedDialogContainer') private wholeSelectedDialogContainer!: ElementRef;

  selectedDialog: SelectedDialog | undefined;

  constructor(public dialogService: DialogService) {
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.scrollToTheBottom();
  }

  scrollToTheBottom() {
    this.wholeSelectedDialogContainer.nativeElement.scrollTop = this.wholeSelectedDialogContainer.nativeElement.scrollHeight;
  }
}
