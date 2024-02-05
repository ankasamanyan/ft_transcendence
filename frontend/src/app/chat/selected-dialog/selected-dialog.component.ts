import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {SelectedDialog} from "../../domain/selected-dialog";
import {DialogService} from "../../service/dialog.service";
import {MessageService} from "../../service/message.service";
import {Message} from "../../domain/message";
import {User} from "../../domain/user";
import {DialogsService} from "../../service/dialogs.service";

@Component({
  selector: 'app-selected-dialog',
  templateUrl: './selected-dialog.component.html',
  styleUrls: ['./selected-dialog.component.css']
})
export class SelectedDialogComponent implements OnChanges, AfterViewChecked {
  @Input()
  selectedPerson: User | undefined;

  @ViewChild('wholeSelectedDialogContainer') private wholeSelectedDialogContainer!: ElementRef;

  selectedDialog: SelectedDialog | undefined;
  message: string | undefined;

  constructor(
      public dialogService: DialogService,
      public messageService: MessageService,
      public dialogsService: DialogsService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedPerson) {
      this.dialogService.getDialog(1, this.selectedPerson.id!).subscribe((value: SelectedDialog) => {
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

  sendMessage() {
    if (this.message!! && this.message !== '') {
      this.messageService.saveMessage(
          new Message(
              1,
              this.selectedPerson!.id!,
              this.message!,
              new Date())
      ).subscribe(() => {
        this.message = '';
        this.clearInputField();
        this.dialogService.getDialog(1, this.selectedPerson!.id!).subscribe((value: SelectedDialog) => {
          this.selectedDialog = value;
        });
        this.dialogsService.updateDialogs.next(true);
      });
    }
  }
  clearInputField() {
    const inputElement = document.getElementById("write-message-input") as HTMLInputElement;
    inputElement.value = '';
  }
}
