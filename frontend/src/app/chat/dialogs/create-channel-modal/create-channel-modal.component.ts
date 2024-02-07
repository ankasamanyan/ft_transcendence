import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User, Users} from "../../../domain/user";
import {ChannelService} from "../../../service/channel.service";

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
    this.channelService.createChannel(new Users(onlySelected)).subscribe(() => {
      this.modalClose.emit();
    });
  }

}
