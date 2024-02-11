import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Channel} from "../../../../domain/channel";
import {ChannelService} from "../../../../service/channel.service";
import {OurSocket} from "../../../../socket/socket";
import {User} from "../../../../domain/user";

@Component({
  selector: 'app-edit-channel-modal',
  templateUrl: './edit-channel-modal.component.html',
  styleUrls: ['./edit-channel-modal.component.css']
})
export class EditChannelModalComponent implements AfterViewInit {
  @Output()
  modalClose = new EventEmitter<void>();

  @Input()
  channel: Channel | undefined;

  @Input()
  channelParticipants: User[] | undefined;

  @ViewChild('name') channelName!: ElementRef;

  constructor(
    private channelService: ChannelService,
    private socket: OurSocket) {
    socket.on("channelRenamed", () => {
      this.channelService.updateChannels.next(true);
    });
    // if (this.channel) {
    //   channelService.getChannelParticipants(this.channel.id!).subscribe((value) => {
    //     this.channelParticipants = value.users;
    //   })
    // }
  }

  ngAfterViewInit() {
    this.channelName.nativeElement.focus();
  }

  changeChannelName() {
    this.channelService.renameChannel(this.channel!);
    this.modalClose.emit();
  }
}
