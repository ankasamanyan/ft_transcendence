import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Channel} from "../../../../domain/channel";
import {ChannelService} from "../../../../service/channel.service";

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

  @ViewChild('name') channelName!: ElementRef;

  constructor(private channelService: ChannelService) {
  }

  ngAfterViewInit() {
    this.channelName.nativeElement.focus();
  }

  changeChannelName() {
    this.channelService.renameChannel(this.channel!.id!, this.channel!.name).subscribe(() => {
        this.channelService.updateChannels.next(true);
        this.modalClose.emit();
      }
    );
  }
}
