import {AfterViewChecked, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MessageService} from "../../service/message.service";
import {ChannelMessage} from "../../domain/channel-message";
import {ChannelService} from "../../service/channel.service";
import {OurSocket} from "../../socket/socket";
import {User, Users} from "../../domain/user";

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
  isMuted: boolean = false;

  constructor(
    private messageService: MessageService,
    private channelService: ChannelService,
    private socket: OurSocket) {
    socket.on("NewMessage", () => {
      if (this.selectedChannelId) {
        this.messageService.getChannelMessages(this.selectedChannelId).subscribe((value) => {
          this.selectedDialog = value;
        });
      }
      this.channelService.updateChannels.next(true);
    });
    socket.on("participantMuted", () => {
      if (this.selectedChannelId) {
        this.channelService.isMuted(1, this.selectedChannelId).subscribe((value) => {
          this.isMuted = value;
          this.sleep(30001).then(() => {
            this.channelService.isMuted(1, this.selectedChannelId!).subscribe((value) => {
              this.isMuted = value;
          });
        })
      })
    }});
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
          new Date()))};
    this.message = '';
    this.clearInputField();
  }

  clearInputField() {
    const inputElement = document.getElementById("write-message-input") as HTMLInputElement;
    inputElement.value = '';
  }
}
