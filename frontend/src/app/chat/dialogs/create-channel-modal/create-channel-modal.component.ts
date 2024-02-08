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
    const newChannel = this.createChannel();
    this.channelService.addChannelInformation(newChannel).subscribe(() => {
      this.modalClose.emit();
    });
  }

  createChannel() {
    const onlySelected = this.selectedUsers();
    const isDialog = onlySelected.length == 1;
    const channelName = isDialog ? onlySelected[0].name : onlySelected.map(user => user.name).join(', ');
    const channelType = isDialog ? "dialog" : "private";
    const authenticatedUser = new User(1, "Anahit", "@akasaman","assets/placeholderAvatar.jpeg")
    const channelOwner = isDialog ? undefined : authenticatedUser;
    const channelAdmin = isDialog ? undefined : [authenticatedUser];
    onlySelected.push(authenticatedUser);
    return new Channel(channelName, channelType, onlySelected, undefined, undefined, channelOwner, channelAdmin)
  }

}
