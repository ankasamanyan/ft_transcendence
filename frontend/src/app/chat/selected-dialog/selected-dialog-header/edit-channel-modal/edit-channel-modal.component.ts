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
      let adminsToAdd = Array.from(this.newAdmins.keys()).filter(user => this.newAdmins.get(user) === true);
      let adminsToRemove = Array.from(this.newAdmins.keys()).filter(user => this.newAdmins.get(user) === false);
      if (adminsToAdd.length != 0) {
        this.channelService.assignAdmins(new ChannelUpdate(this.channel!.id!, adminsToAdd));
      }
      if (adminsToRemove.length != 0) {
        this.channelService.removeAdmins(new ChannelUpdate(this.channel!.id!, adminsToAdd));
      }
    }
    this.modalClose.emit();
  }

  channelDetailsChanged() {
    return this.doesPasswordProtectedChannelHasPassword()
      && (this.isNameChanged()
        || this.isTypeChanged()
        || this.passwordChangedTypeDidnt()
        || this.adminsChanged());
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
}
