import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {Channel} from "../../../../domain/channel";
import {ChannelService} from "../../../../service/channel.service";
import {OurSocket} from "../../../../socket/socket";
import {User} from "../../../../domain/user";
import {ChannelUpdate} from "../../../../domain/channel-update";

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

  @Input()
  channelParticipants: User[] | undefined;

  @Input()
  admins: User[] | undefined;

  @ViewChild('name') channelName!: ElementRef;

  nameOnInit: string | undefined;
  typeOnInit: string | undefined;
  passwordOnInit: string | undefined;
  newAdmins = new Map<User, boolean>();
  byeByeUsers = new Map<User, string>();
  authenticatedUser: User = new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg");
  displayTypes: boolean = false;

  constructor(
    private channelService: ChannelService) {
  }

  ngAfterViewInit() {
    this.channelName.nativeElement.focus();
    this.nameOnInit = this.channel?.name;
    this.typeOnInit = this.channel?.type;
    this.passwordOnInit = this.channel?.password;
  }

  changeChannelDetails() {
    if (this.isNameChanged()) {
      this.channelService.renameChannel(this.channel!);
    }
    if (this.isTypeChanged()) {
      this.processTypeChange();
    }
    if (this.isPasswordChanged()) {
      this.channelService.setPassword(this.channel!);
    }
    if (this.adminsChanged()) {
      this.processAdminChange();
    }
    if (this.someUsersShouldGo()) {
      this.processLeavingUsers();
    }
    this.modalClose.emit();
  }

  channelDetailsChanged() {
    return this.doesPasswordProtectedChannelHasPassword()
      && (this.isNameChanged()
        || this.isTypeChanged()
        || this.passwordChangedTypeDidnt()
        || this.adminsChanged()
        || this.someUsersShouldGo());
  }

  isNameChanged() {
    return this.nameOnInit != this.channel?.name;
  }

  isTypeChanged() {
    return this.typeOnInit != this.channel?.type;
  }

  isPasswordChanged() {
    return this.passwordOnInit != this.channel?.password;
  }

  adminsChanged() {
    return this.newAdmins.size !== 0;
  }

  someUsersShouldGo() {
    return this.byeByeUsers.size !== 0;
  }

  passwordChangedTypeDidnt() {
    return this.isPasswordChanged()
      && this.typeOnInit === "password-protected"
      && this.isCurrentTypePasswordProtected();
  }

  isAuthenticatedUserOwner() {
    return this.authenticatedUser.id === this.channel?.owner!.id;
  }

  isCurrentTypePrivate() {
    return this.channel?.type === "private";
  }

  isCurrentTypePublic() {
    return this.channel?.type === "public";
  }

  isCurrentTypePasswordProtected() {
    return this.channel?.type === "password-protected";
  }

  doesPasswordProtectedChannelHasPassword() {
    if (this.isCurrentTypePasswordProtected()) {
      return this.channel?.password != undefined && this.channel?.password != "";
    }
    return true;
  }

  @HostListener('document:click', ['$event'])
  hideTypes(event: MouseEvent) {
    const isClickOnType = document.getElementsByClassName("current-type")[0].contains(event.target as HTMLElement)
    if (this.displayTypes && !isClickOnType) {
      this.displayTypes = false;
    }
  }

  changeTypeToPrivate() {
    this.displayTypes = false;
    this.channel!.type = "private";
  }

  changeTypeToPublic() {
    this.displayTypes = false;
    this.channel!.type = "public";
  }

  changeTypeToPasswordProtected() {
    this.displayTypes = false;
    this.channel!.type = "password-protected";
  }

  processTypeChange() {
    this.channelService.changeChannelType(this.channel!);
    if (this.typeOnInit === "password-protected" && (this.isCurrentTypePrivate() || this.isCurrentTypePublic())) {
      this.channelService.deletePassword(this.channel!.id!);
    }
  }

  processAdminChange() {
    let adminsToAdd = Array.from(this.newAdmins.keys()).filter(user => this.newAdmins.get(user) === true);
    let adminsToRemove = Array.from(this.newAdmins.keys()).filter(user => this.newAdmins.get(user) === false);
    if (adminsToAdd.length != 0) {
      this.channelService.assignAdmins(new ChannelUpdate(this.channel!.id!, adminsToAdd));
    }
    if (adminsToRemove.length != 0) {
      this.channelService.removeAdmins(new ChannelUpdate(this.channel!.id!, adminsToAdd));
    }
  }

  processLeavingUsers() {
    let leavingForSomeTime = Array.from(this.byeByeUsers.keys()).filter(user => this.byeByeUsers.get(user) === "kick");
    let leavingForGood = Array.from(this.byeByeUsers.keys()).filter(user => this.byeByeUsers.get(user) === "ban");
    if (leavingForSomeTime.length != 0) {
      this.channelService.kickUsers(new ChannelUpdate(this.channel!.id!, leavingForSomeTime));
    }
    if (leavingForGood.length != 0) {
      this.channelService.banUsers(new ChannelUpdate(this.channel!.id!, leavingForGood));
    }
  }

  setValuesToInitialOnes() {
    this.channel!.password = this.passwordOnInit;
    this.channel!.name = this.nameOnInit!;
    this.channel!.type = this.typeOnInit;
    this.modalClose.emit();
  }

  addAdmin(user: User) {
    if (this.newAdmins.get(user)) {
      this.newAdmins.delete(user);
    } else {
      this.newAdmins.set(user, true);
    }
  }

  removeAdminRights(user: User) {
    if (this.newAdmins.get(user)) {
      this.newAdmins.delete(user);
    } else {
      this.newAdmins.set(user, false);
    }
  }

  kickUser(user: User) {
    this.byeByeUsers.set(user, "kick");
  }

  banUser(user: User) {
    this.byeByeUsers.set(user, "ban");
  }
}
