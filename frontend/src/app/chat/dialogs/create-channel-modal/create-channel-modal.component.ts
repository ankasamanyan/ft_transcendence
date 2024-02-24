import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User, Users} from "../../../domain/user";
import {ChannelService} from "../../../service/channel.service";
import {Channel} from "../../../domain/channel";

@Component({
  selector: 'app-create-channel-modal',
  templateUrl: './create-channel-modal.component.html',
  styleUrls: ['./create-channel-modal.component.css']
})
export class CreateChannelModalComponent {
  @Output()
  modalClose = new EventEmitter<void>();

  @Input()
  users: Users | undefined;

  usersWithStatus = new Map<User, boolean>();

  constructor(public channelService: ChannelService) {

  }

  saveUserStatus(user: User, isSelected: boolean) {
    this.usersWithStatus.set(user, isSelected);
  }

  selectedUsers() {
    return Array.from(this.usersWithStatus.keys()).filter(user => this.usersWithStatus.get(user) === true);
  }

  selectUsers() {
    const onlySelected = this.selectedUsers();
    const authenticatedUser = new User(1, "Anahit", "@akasaman","assets/placeholderAvatar.jpeg", "", true, false)
    onlySelected.push(authenticatedUser);
    this.channelService.addChannelInformation(onlySelected).subscribe((value: any) => {
      const channel = value as Channel;
      this.channelService.addChannelParticipants(channel).subscribe(() => {
        if (channel.type != "dialog") {
          this.channelService.addChannelAdmin(channel).subscribe(() => {
          });
        }
        this.channelService.updateChannels.next(true);
        this.modalClose.emit();
      })
    });
  }
}
