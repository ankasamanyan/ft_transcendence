import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User, Users} from "../../../domain/user";
import {FriendService} from "../../../service/friend.service";

@Component({
  selector: 'app-selected-dialog-header',
  templateUrl: './selected-dialog-header.component.html',
  styleUrls: ['./selected-dialog-header.component.css']
})
export class SelectedDialogHeaderComponent implements OnChanges {
  @Input()
  selectedPerson: User | undefined;

  @Input()
  selectedPersonBefriendable: boolean | undefined;

  showBlockModal: boolean = false;
  showInvitedToPlayNotification: boolean = false;
  showInvitedToBeFriendsNotification: boolean = false;

  constructor(public friendService: FriendService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedPerson) {
      this.friendService.befriendable(1, this.selectedPerson.id!).subscribe((value) => {
        this.selectedPersonBefriendable = value;
      })
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  sendAFriendRequest() {
    this.friendService.sendAFriendRequest(
        new Users([
            new User(1, "Anahit", "@akasaman","assets/placeholderAvatar.jpeg"),
            this.selectedPerson!
        ])
    ).subscribe(() => {
      this.showInvitedToBeFriendsNotificationForFewSeconds();
      this.friendService.befriendable(1, this.selectedPerson!.id!).subscribe((value) => {
        this.selectedPersonBefriendable = value;
      });
    });
  }

  showInviteNotificationForFewSeconds() {
    this.showInvitedToPlayNotification = true;
    this.sleep(2000).then(() => { this.showInvitedToPlayNotification = false; });
  }

  showInvitedToBeFriendsNotificationForFewSeconds() {
    this.showInvitedToBeFriendsNotification = true;
    this.sleep(2000).then(() => { this.showInvitedToBeFriendsNotification = false; });
  }
}
