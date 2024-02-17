import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {User} from "../../../../../domain/user";
import {Channel} from "../../../../../domain/channel";

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent {
  @Input()
  authenticatedUser: User | undefined

  @Input()
  participant: User | undefined

  @Input()
  channel: Channel | undefined

  @Input()
  admins: User[] | undefined

  @Output()
  adminAdded = new EventEmitter<User>();

  @Output()
  adminRemoved = new EventEmitter<User>();

  @Output()
  userKickedOut = new EventEmitter<User>();

  @Output()
  userBanned = new EventEmitter<User>();

  @Output()
  userMuted = new EventEmitter<User>();

  displayUserActions: boolean = false;
  tempAdminStatus: boolean = false;
  tempKickedOut: boolean = false;
  tempBanned: boolean = false;
  tempMuted: boolean = false;

  isOwner(user: User) {
    return user.id === this.channel?.owner?.id;
  }

  isAdmin(user: User) {
    if (this.admins) {
      return this.admins.some((admin) => admin.id === user.id) && !this.isOwner(user);
    }
    return false;
  }

  isAuthenticatedUserOwner() {
    return this.authenticatedUser?.id === this.channel?.owner!.id;
  }

  isAuthenticatedUserAdmin() {
    return this.admins?.some((value) => value.id === this.authenticatedUser?.id);
  }

  isAuthenticatedadminOrOwner() {
    return this.isAuthenticatedUserOwner() || this.isAuthenticatedUserAdmin();
  }

  @HostListener('document:click', ['$event'])
  hideUserActions(event: MouseEvent) {
    const isClickOnDots = (event.target as HTMLElement).classList.contains('bi-three-dots-vertical')
    if (this.displayUserActions && !isClickOnDots) {
      this.displayUserActions = false;
    }
  }

  makeAdmin() {
    this.tempAdminStatus = true;
    this.tempKickedOut = false;
    this.tempMuted = false;
    this.tempBanned = false;
    this.adminAdded.emit(this.participant);
  }

  removeAdminRights() {
    this.tempAdminStatus = false;
    this.tempKickedOut = false;
    this.tempMuted = false;
    this.tempBanned = false;
    this.adminRemoved.emit(this.participant);
  }

  kickOut() {
    this.tempKickedOut = true;
    this.tempMuted = false;
    this.tempBanned = false;
    this.tempAdminStatus = false;
    this.userKickedOut.emit(this.participant);
  }

  ban() {
    this.tempBanned = true;
    this.tempKickedOut = false;
    this.tempMuted = false;
    this.tempAdminStatus = false;
    this.userBanned.emit(this.participant);
  }

  mute() {
    this.tempMuted = true;
    this.tempKickedOut = false;
    this.tempBanned = false;
    this.tempAdminStatus = false;
    this.userMuted.emit(this.participant);
  }
}
