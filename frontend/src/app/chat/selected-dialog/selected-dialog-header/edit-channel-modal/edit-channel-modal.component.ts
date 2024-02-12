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
  authenticatedUser: User = new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg");
  displayTypes: boolean = false;

  constructor(
    private channelService: ChannelService,
    private socket: OurSocket) {
    socket.on("channelRenamed", () => {
      this.channelService.updateChannels.next(true);
    });
  }

  ngAfterViewInit() {
    this.channelName.nativeElement.focus();
    this.nameOnInit = this.channel?.name;
    this.typeOnInit = this.channel?.type;
  }

  changeChannelDetails() {
    this.channelService.renameChannel(this.channel!);
    this.modalClose.emit();
  }

  isOwner(user: User) {
    return user.id === this.channel?.owner?.id;
  }

  isAdmin(user: User) {
    return this.admins!.some((admin) => admin.id === user.id) && !this.isOwner(user);
  }

  channelDetailsChanged() {
    return this.isNameChanged() || this.isTypeChanged();
  }

  isNameChanged() {
    return this.nameOnInit != this.channel?.name;
  }

  isTypeChanged() {
    return this.typeOnInit != this.channel?.type;
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
}
