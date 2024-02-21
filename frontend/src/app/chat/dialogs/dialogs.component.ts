import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {User, Users} from "../../domain/user";
import {Channel} from "../../domain/channel";
import {ChannelService} from "../../service/channel.service";
import {OurSocket} from "../../socket/socket";

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {
  channels: Channel[] = [];
  searchedForChannels: Channel[] = [];
  displayedChannels: Channel[] = [];
  selectedChannelId: number | undefined;
  users: Users | undefined;
  authenticatedUser: User = new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg", "", true);

  showCreateChannelModal: boolean = false;
  channelsLoaded: boolean = false;
  searchModeOn: boolean = false;

  @Output()
  selectedChannelChanged = new EventEmitter<number>();

  constructor(
      private usersService: UsersService,
      private channelService: ChannelService,
      private socket: OurSocket) {
    this.getChannels();
    usersService.getUsers(1).subscribe((value)  => {
      this.users = value;
    });
    socket.on("participantKicked", () => {
      this.getChannels();
    });
    socket.on("participantBanned", () => {
      this.getChannels();
    });
    socket.on("participantLeft", ({userId}: {userId: number}) => {
      if (userId === this.authenticatedUser.id) {
        this.selectedChannelId = undefined;
      }
      this.getChannels();
    });
    socket.on("channelRenamed", () => {
      this.getChannels();
    });
    socket.on("channelTypeChanged", () => {
      this.getChannels();
    });
    socket.on("passwordSet", () => {
      this.getChannels();
    });
    socket.on("passwordDeleted", () => {
      this.getChannels();
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
      this.searchModeOn = false;
    } else {
      this.displayedChannels = this.searchedForChannels
        .filter((channel) => channel.name?.toUpperCase().startsWith(channelToSearchFor.toUpperCase()));
      this.searchModeOn = true;
    }
  }

  changeSelectedChannel(selectedChannelId: number) {
    if (this.channels.some((channel) => channel.id === selectedChannelId)) {
      this.selectedChannelId = selectedChannelId;
      this.selectedChannelChanged.emit(selectedChannelId);
    }
    else {

    }
  }

  noChannels() {
    return this.channels.length === 0 && this.channelsLoaded;
  }

  getChannels() {
    this.channelService.getChannels(1).subscribe((value)  => {
      this.channels = value.channels;
      this.displayedChannels = this.channels;
      this.channelService.getChannelsAvailableWhenSearching(1).subscribe((value) => {
        this.searchedForChannels = value.channels;
        this.channelsLoaded = true;
      });
    });
  }
}
