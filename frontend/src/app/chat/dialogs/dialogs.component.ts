import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {Users} from "../../domain/user";
import {Channel} from "../../domain/channel";
import {ChannelService} from "../../service/channel.service";

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {
  channels: Channel[] = [];
  displayedChannels: Channel[] = [];
  selectedChannelId: number | undefined;
  users: Users | undefined;

  showCreateChannelModal: boolean = false;
  channelsLoaded: boolean = false;

  @Output()
  selectedChannelChanged = new EventEmitter<number>();

  constructor(
      private usersService: UsersService,
      private channelService: ChannelService) {
    this.getChannels();
    usersService.getUsers(1).subscribe((value)  => {
      this.users = value;
    });
  }

  ngOnInit(): void {
    this.channelService.updateChannels.next(false);
    this.channelService.updateChannels.subscribe(value => {
      if (value) {
        this.getChannels();
      }
    });
  }

  find(channelToSearchFor: string) {
    if (channelToSearchFor == "") {
      this.displayedChannels = this.channels;
    } else {
      this.displayedChannels = this.channels
        .filter((channel) => channel.name?.toUpperCase().startsWith(channelToSearchFor.toUpperCase()));
    }
  }

  changeSelectedChannel(selectedChannelId: number) {
    this.selectedChannelId = selectedChannelId;
    this.selectedChannelChanged.emit(selectedChannelId);
  }

  noChannels() {
    return this.channels.length === 0 && this.channelsLoaded;
  }

  getChannels() {
    this.channelService.getChannels(1).subscribe((value)  => {
      this.channels = value.channels!;
      this.changeSelectedChannel(this.channels[0].id!);
      this.displayedChannels = this.channels;
      this.channelsLoaded = true;
    });
  }
}
