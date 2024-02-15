import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
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

  displayUserActions: boolean = false;

  isOwner(user: User) {
    return user.id === this.channel?.owner?.id;
  }

  isAdmin(user: User) {
    return this.admins!.some((admin) => admin.id === user.id) && !this.isOwner(user);
  }

  isAuthenticatedUserOwner() {
    return this.authenticatedUser?.id === this.channel?.owner!.id;
  }

  isAuthenticatedUserAdmin() {
    return this.channel?.admins?.some((value) => value.id === this.authenticatedUser?.id);
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
}
