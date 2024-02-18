import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User, Users} from "../../../domain/user";
import {FriendService} from "../../../service/friend.service";
import {UsersService} from "../../../service/users.service";
import {ChannelService} from "../../../service/channel.service";
import {Channel} from "../../../domain/channel";
import {OurSocket} from "../../../socket/socket";

@Component({
  selector: 'app-selected-dialog-header',
  templateUrl: './selected-dialog-header.component.html',
  styleUrls: ['./selected-dialog-header.component.css']
})
export class SelectedDialogHeaderComponent implements OnChanges {
  @Input()
  selectedChannelId: number | undefined;

  channel: Channel | undefined;
  participants: User[] | undefined;
  admins: User[] | undefined;
  selectedDialogPartner: User | undefined;
  selectedPersonBefriendable: boolean | undefined;

  showBlockModal: boolean = false;
  showEditModal: boolean = false;
  showInvitedToPlayNotification: boolean = false;
  showInvitedToBeFriendsNotification: boolean = false;

  constructor(
    private friendService: FriendService,
    private userService: UsersService,
    private channelService: ChannelService,
    private socket: OurSocket) {
    socket.on("channelRenamed", () => {
      this.channelService.updateChannels.next(true);
      this.getChannel();
    });
    socket.on("channelTypeChanged", () => {
      this.channelService.updateChannels.next(true);
      this.getChannel();
    });
    socket.on("passwordSet", () => {
      this.channelService.updateChannels.next(true);
      this.getChannel();
    });
    socket.on("passwordDeleted", () => {
      this.channelService.updateChannels.next(true);
      this.getChannel();
    });
    socket.on("adminsAdded", () => {
      this.channelService.updateChannels.next(true);
      this.getChannel();
    });
    socket.on("adminsNoMore", () => {
      this.channelService.updateChannels.next(true);
      this.getChannel();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedChannelId) {
      this.getChannel();
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  sendAFriendRequest() {
    this.friendService.sendAFriendRequest(
      new Users([
        new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg"),
        this.selectedDialogPartner!
      ])
    ).subscribe(() => {
      this.showInvitedToBeFriendsNotificationForFewSeconds();
      this.friendService.befriendable(new Users([
        new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg"),
        this.selectedDialogPartner!
      ])).subscribe((value) => {
        this.selectedPersonBefriendable = value;
      });
    });
  }

  showInviteNotificationForFewSeconds() {
    this.showInvitedToPlayNotification = true;
    this.sleep(2000).then(() => {
      this.showInvitedToPlayNotification = false;
    });
  }

  showInvitedToBeFriendsNotificationForFewSeconds() {
    this.showInvitedToBeFriendsNotification = true;
    this.sleep(2000).then(() => {
      this.showInvitedToBeFriendsNotification = false;
    });
  }

  getChannel() {
    this.selectedDialogPartner = undefined;
    this.channelService.getChannelDetailsById(this.selectedChannelId!).subscribe((value) => {
      this.channel = value;
      this.getParticipants();
      this.getAdmins();
    });
  }

  getParticipants() {
    this.channelService.getChannelParticipants(this.selectedChannelId!).subscribe((value) => {
      this.participants = value.users;
      this.getDialogPartner()
    });
  }

  getAdmins() {
    this.channelService.getChannelAdmins(this.selectedChannelId!).subscribe((value) => {
      this.admins = value.users;
    });
  }

  getDialogPartner() {
    if (this.participants!.length === 2) {
      this.selectedDialogPartner = this.participants!.filter((value) => {
        return value.id != 1
      })[0];
      this.checkWhetherBefriendable();
    }
  }


  checkWhetherBefriendable() {
    if (this.selectedDialogPartner) {
      this.friendService.befriendable(new Users([
        new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg"),
        this.selectedDialogPartner!
      ])).subscribe((value) => {
        this.selectedPersonBefriendable = value;
      })
    }
  }

  isDialog() {
    return this.channel?.type === "dialog";
  }
}
