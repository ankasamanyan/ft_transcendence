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
  passwordOnInit: string | undefined;
  authenticatedUser: User = new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg");
  displayTypes: boolean = false;

  constructor(
    private channelService: ChannelService,
    private socket: OurSocket) {
    socket.on("channelRenamed", () => {
      this.channelService.updateChannels.next(true);
    });
    socket.on("channelTypeChanged", () => {
      this.channelService.updateChannels.next(true);
    });
    socket.on("passwordSet", () => {
      this.channelService.updateChannels.next(true);
    });
    socket.on("passwordDeleted", () => {
      this.channelService.updateChannels.next(true);
    });
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
    this.modalClose.emit();
  }

  channelDetailsChanged() {
    return this.doesPasswordProtectedChannelHasPassword()
      && (this.isNameChanged()
      || this.isTypeChanged()
      || this.passwordChangedTypeDidnt());
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
}
