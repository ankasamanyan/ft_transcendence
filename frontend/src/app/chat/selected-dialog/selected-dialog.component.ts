import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MessageService} from "../../service/message.service";
import {ChannelMessage} from "../../domain/channel-message";
import {ChannelService} from "../../service/channel.service";

@Component({
  selector: 'app-selected-dialog',
  templateUrl: './selected-dialog.component.html',
  styleUrls: ['./selected-dialog.component.css']
})
export class SelectedDialogComponent implements OnChanges, AfterViewChecked {
  @Input()
  selectedChannelId: number | undefined;

  @ViewChild('wholeSelectedDialogContainer') private wholeSelectedDialogContainer!: ElementRef;

  selectedDialog: ChannelMessage[] | undefined;
  message: string | undefined;

  constructor(
      private messageService: MessageService,
      private channelService: ChannelService)
  {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedChannelId) {
      this.messageService.getChannelMessages(this.selectedChannelId).subscribe((value) => {
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

  sendChannelMessage() {
    if (this.message!! && this.message !== '') {
      this.messageService.saveChannelMessage(
          new ChannelMessage(
              this.selectedChannelId!,
              1,
              this.message!,
              new Date())
      ).subscribe(() => {
        this.message = '';
        this.clearInputField();
        this.messageService.getChannelMessages(this.selectedChannelId!).subscribe((value) => {
          this.selectedDialog = value;
        });
        this.channelService.updateChannels.next(true);
      });
    }
  }
  clearInputField() {
    const inputElement = document.getElementById("write-message-input") as HTMLInputElement;
    inputElement.value = '';
  }
}
