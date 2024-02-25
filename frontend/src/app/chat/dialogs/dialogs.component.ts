import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {User, Users} from "../../domain/user";
import {Channel} from "../../domain/channel";
import {ChannelService} from "../../service/channel.service";
import {OurSocket} from "../../socket/socket";
import {ChannelUpdate} from "../../domain/channel-update";
import {SharedDataService} from "../../service/shared-data.service";

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {
  channels: Channel[] = [];
  searchedForChannels: Channel[] = [];
  displayedChannels: Channel[] = [];
  foundChannel: Channel | undefined
  selectedChannelId: number | undefined;
  users: Users | undefined;

  showCreateChannelModal: boolean = false;
  channelsLoaded: boolean = false;
  searchModeOn: boolean = false;
  showEnterPasswordModal: boolean = false;
  authenticatedUser: User | undefined;

  @Output()
  selectedChannelChanged = new EventEmitter<number>();

  constructor(
      private usersService: UsersService,
      private channelService: ChannelService,
      private sharedDataService: SharedDataService,
      private socket: OurSocket) {
    socket.on("participantKicked", () => {
      this.getChannels();
    });
    socket.on("participantBanned", () => {
      this.getChannels();
    });
    socket.on("participantLeft", ({userId}: {userId: number}) => {
      if (userId === this.authenticatedUser!.id) {
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
    socket.on("participantJoined", () => {
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
    this.sharedDataService.getMyUserId$().subscribe((value) => {
      this.usersService.getUserById(value).subscribe((user) => {
        this.authenticatedUser = user;
        this.usersService.getUsers(this.authenticatedUser!.id!).subscribe((value)  => {
          this.users = value;
        });
        this.getChannels();
      });
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
      this.channelService.getChannelDetailsById(selectedChannelId).subscribe((value) => {
        this.foundChannel = value;
        if (this.foundChannel!.type === "public") {
          this.channelService.enterChannel(new ChannelUpdate(selectedChannelId, [this.authenticatedUser!]));
          this.selectedChannelId = selectedChannelId;
          this.selectedChannelChanged.emit(selectedChannelId);
        }
        else if (this.foundChannel!.type === "password-protected") {
          this.selectedChannelId = selectedChannelId;
          this.showEnterPasswordModal = true;
        }
      })
    }
  }

  noChannels() {
    return this.channels.length === 0 && this.channelsLoaded;
  }

  getChannels() {
    this.channelService.getChannels(this.authenticatedUser?.id!).subscribe((value)  => {
      this.channels = value.channels;
      this.displayedChannels = this.channels;
      this.channelService.getChannelsAvailableWhenSearching(this.authenticatedUser?.id!).subscribe((value) => {
        this.searchedForChannels = value.channels;
        this.channelsLoaded = true;
      });
    });
  }

  handleEnteredPassword() {
    this.showEnterPasswordModal = false;
    this.channelService.enterChannel(new ChannelUpdate(this.selectedChannelId!, [this.authenticatedUser!]));
    this.selectedChannelChanged.emit(this.selectedChannelId);
  }
}
