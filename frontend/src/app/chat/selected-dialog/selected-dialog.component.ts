import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MessageService} from "../../service/message.service";
import {ChannelMessage} from "../../domain/channel-message";
import {ChannelService} from "../../service/channel.service";
import {OurSocket} from "../../socket/socket";
import {User} from "../../domain/user";
import {SharedDataService} from "../../service/shared-data.service";
import {UsersService} from "../../service/users.service";

@Component({
  selector: 'app-selected-dialog',
  templateUrl: './selected-dialog.component.html',
  styleUrls: ['./selected-dialog.component.css']
})
export class SelectedDialogComponent implements OnChanges, AfterViewChecked, OnInit {
  @Input()
  selectedChannelId: number | undefined;

  @ViewChild('wholeSelectedDialogContainer') private wholeSelectedDialogContainer!: ElementRef;

  selectedDialog: ChannelMessage[] | undefined;
  authenticatedUser: User | undefined;
  message: string | undefined;
  isMuted: boolean = false;
  isBlocked: boolean = false;

  constructor(
    private messageService: MessageService,
    private channelService: ChannelService,
    private userService: UsersService,
    private sharedDataService: SharedDataService,
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
        this.channelService.isMuted(this.authenticatedUser?.id!, this.selectedChannelId).subscribe((value) => {
          this.isMuted = value;
          this.sleep(30001).then(() => {
            this.channelService.isMuted(this.authenticatedUser?.id!, this.selectedChannelId!).subscribe((value) => {
              this.isMuted = value;
            });
          })
        })
      }
    });
    socket.on("participantLeft", ({userId}: { userId: number }) => {
      if (userId === this.authenticatedUser!.id) {
        this.selectedDialog = undefined;
        this.selectedChannelId = undefined;
      }
    });
    socket.on("participantJoined", () => {
      if (this.selectedChannelId) {
        this.messageService.getChannelMessages(this.selectedChannelId).subscribe((value) => {
          this.selectedDialog = value;
        });
      }
      this.channelService.updateChannels.next(true);
    });
  }

  ngOnInit() {
    this.sharedDataService.getMyUserId$().subscribe((value) => {
      this.userService.getUserById(value).subscribe((user) => {
        this.authenticatedUser = user;
      });
    });
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
          this.authenticatedUser?.id!,
          this.message!,
          new Date()))
    }
    this.message = '';
    this.clearInputField();
  }

  clearInputField() {
    const inputElement = document.getElementById("write-message-input") as HTMLInputElement;
    inputElement.value = '';
  }
}
