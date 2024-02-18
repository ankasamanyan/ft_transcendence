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
  updatedUsers = new Map<User, string>();
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
    if (this.areUsersLeaving()) {
      this.processLeavingUsers();
    }
    if (this.isAnyoneMuted()) {
      this.processHushUsers();
    }
    this.modalClose.emit();
  }

  channelDetailsChanged() {
    console.log(this.updatedUsers);
    return this.doesPasswordProtectedChannelHasPassword()
      && (this.isNameChanged()
        || this.isTypeChanged()
        || this.passwordChangedTypeDidnt()
        || this.adminsChanged()
        || this.areThereUserUpdates());
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
    const adminChanges = Array.from(this.updatedUsers.keys()).filter(user =>
      this.updatedUsers.get(user) === "makeAdmin"
      || this.updatedUsers.get(user) === "removeAdminRights");
    return adminChanges.length != 0;
  }

  areUsersLeaving() {
    const participantsCountChange = Array.from(this.updatedUsers.keys()).filter(user =>
      this.updatedUsers.get(user) === "kick"
      || this.updatedUsers.get(user) === "ban");
    return participantsCountChange.length != 0;
  }

  areThereUserUpdates() {
    return this.updatedUsers.size !== 0;
  }

  isAnyoneMuted() {
    const participantsToBeMuted = Array.from(this.updatedUsers.keys()).filter(user =>
      this.updatedUsers.get(user) === "mute");
    return participantsToBeMuted.length != 0;
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
    let adminsToAdd = Array.from(this.updatedUsers.keys()).filter(user => this.updatedUsers.get(user) === "makeAdmin");
    let adminsToRemove = Array.from(this.updatedUsers.keys()).filter(user => this.updatedUsers.get(user) === "removeAdminRights");
    if (adminsToAdd.length != 0) {
      this.channelService.assignAdmins(new ChannelUpdate(this.channel!.id!, adminsToAdd));
    }
    if (adminsToRemove.length != 0) {
      this.channelService.removeAdmins(new ChannelUpdate(this.channel!.id!, adminsToRemove));
    }
  }

  processLeavingUsers() {
    let leavingForSomeTime = Array.from(this.updatedUsers.keys()).filter(user => this.updatedUsers.get(user) === "kick");
    let leavingForGood = Array.from(this.updatedUsers.keys()).filter(user => this.updatedUsers.get(user) === "ban");
    if (leavingForSomeTime.length != 0) {
      this.channelService.kickUsers(new ChannelUpdate(this.channel!.id!, leavingForSomeTime));
    }
    if (leavingForGood.length != 0) {
      this.channelService.banUsers(new ChannelUpdate(this.channel!.id!, leavingForGood));
    }
  }

  processHushUsers() {
    let hushUsers = Array.from(this.updatedUsers.keys()).filter(user => this.updatedUsers.get(user) === "mute");
    if (hushUsers.length != 0) {
      this.channelService.muteUsers(new ChannelUpdate(this.channel!.id!, hushUsers));
    }
  }
  setValuesToInitialOnes() {
    this.channel!.password = this.passwordOnInit;
    this.channel!.name = this.nameOnInit!;
    this.channel!.type = this.typeOnInit;
    this.modalClose.emit();
  }

  addAdmin(user: User) {
    if (this.updatedUsers.get(user) === "removeAdminRights") {
      this.updatedUsers.delete(user);
    } else {
      this.updatedUsers.set(user, "makeAdmin");
    }
  }

  removeAdminRights(user: User) {
    if (this.updatedUsers.get(user) === "makeAdmin") {
      this.updatedUsers.delete(user);
    } else {
      this.updatedUsers.set(user, "removeAdminRights");
    }
  }

  kickUser(user: User) {
    this.updatedUsers.set(user, "kick");
  }

  banUser(user: User) {
    this.updatedUsers.set(user, "ban");
  }

  muteUser(user: User) {
    this.updatedUsers.set(user, "mute");
  }
}
