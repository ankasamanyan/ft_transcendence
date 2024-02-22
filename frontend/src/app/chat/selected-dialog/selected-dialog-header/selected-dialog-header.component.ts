import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {User, Users} from "../../../domain/user";
import {FriendService} from "../../../service/friend.service";
import {UsersService} from "../../../service/users.service";
import {ChannelService} from "../../../service/channel.service";
import {Channel} from "../../../domain/channel";
import {OurSocket} from "../../../socket/socket";
import {GameService} from "../../../service/game.service";
import {ChannelUpdate} from "../../../domain/channel-update";
import {BlockedUsersService} from "../../../service/blocked-users.service";

@Component({
  selector: 'app-selected-dialog-header',
  templateUrl: './selected-dialog-header.component.html',
  styleUrls: ['./selected-dialog-header.component.css']
})
export class SelectedDialogHeaderComponent implements OnChanges {
  @Input()
  selectedChannelId: number | undefined;

  @Output()
  userBlocked = new EventEmitter<boolean>();

  authenticatedUser: User = new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg", "", true);
  channel: Channel | undefined;
  participants: User[] | undefined;
  admins: User[] | undefined;
  selectedDialogPartner: User | undefined;
  selectedPersonBefriendable: boolean | undefined;

  showBlockModal: boolean = false;
  showEditModal: boolean = false;
  showLeaveModal: boolean = false;
  showInvitedToPlayNotification: boolean = false;
  showInvitedToBeFriendsNotification: boolean = false;
  isBlocking: boolean = false;

  constructor(
    private friendService: FriendService,
    private userService: UsersService,
    private channelService: ChannelService,
    private gameService: GameService,
    private blockedUserService: BlockedUsersService,
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
    socket.on("adminsRemoved", () => {
      this.channelService.updateChannels.next(true);
      this.getChannel();
    });
    socket.on("participantKicked", () => {
      this.channelService.updateChannels.next(true);
      this.getChannel();
    });
    socket.on("participantBanned", () => {
      this.channelService.updateChannels.next(true);
      this.getChannel();
    });
    socket.on("participantMuted", () => {
      this.channelService.updateChannels.next(true);
      this.getChannel();
    });
    socket.on("participantLeft", ({userId}: {userId: number}) => {
      this.channelService.updateChannels.next(true);
      if (userId === this.authenticatedUser.id) {
        this.channel = undefined;
        this.selectedDialogPartner = undefined;
        this.selectedChannelId = undefined;
      }
      else {
        this.getChannel();
      }
    });
    socket.on("invitationSent", () => {
      this.showInviteNotificationForFewSeconds();
    });
    socket.on("userBlocked", ({blockerId, blockeeId}: { blockerId: number, blockeeId: number }) => {
      if (this.authenticatedUser.id === blockeeId && this.selectedDialogPartner?.id === blockerId) {
        this.updateBlockedStatus();
      }
      else if (this.authenticatedUser.id === blockerId && this.selectedDialogPartner?.id === blockeeId) {
        this.updateBlockingStatus();
      }
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
        new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg", "", true),
        this.selectedDialogPartner!
      ])
    ).subscribe(() => {
      this.showInvitedToBeFriendsNotificationForFewSeconds();
      this.friendService.befriendable(1, this.selectedDialogPartner?.id!).subscribe((value) => {
        this.selectedPersonBefriendable = value;
      });
    });
  }

  inviteUserToPlay() {
    this.gameService.invite(new Users([
      new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg", "", true),
      this.selectedDialogPartner!
    ]));
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
      this.updateBlockedStatus();
      this.updateBlockingStatus();
    }
  }


  checkWhetherBefriendable() {
    if (this.selectedDialogPartner) {
      this.friendService.befriendable(1, this.selectedDialogPartner.id!).subscribe((value) => {
        this.selectedPersonBefriendable = value;
      })
    }
  }

  isDialog() {
    return this.channel?.type === "dialog";
  }

  makeDecisionToLeaveOrStay(event: boolean) {
    if (!event) {
      this.showLeaveModal = false;
    } else {
      this.channelService.leaveChannel(new ChannelUpdate(
        this.channel?.id!,
        [new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg", "", true)]
      ));
      this.showLeaveModal = false;
    }
  }

  updateBlockedStatus() {
    if (this.selectedDialogPartner) {
      this.blockedUserService.isBlocked(this.selectedDialogPartner.id!, this.authenticatedUser.id!).subscribe((value) => {
        this.userBlocked.emit(value);
      })
    }
  }

  updateBlockingStatus() {
    if (this.selectedDialogPartner) {
      this.blockedUserService.isBlocked(this.authenticatedUser.id!, this.selectedDialogPartner.id!).subscribe((value) => {
        this.isBlocking = value;
      })
    }
  }
}
