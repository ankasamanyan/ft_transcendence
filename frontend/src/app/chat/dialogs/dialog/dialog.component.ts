import {Component, Input, OnInit} from '@angular/core';
import {Channel} from "../../../domain/channel";
import {User} from "../../../domain/user";
import {ChannelService} from "../../../service/channel.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input()
  channel: Channel | undefined;

  @Input()
  authenticatedUser: User | undefined;

  participants: User[] | undefined;

  constructor(private channelService: ChannelService) {
  }

  ngOnInit() {
    this.channelService.getChannelParticipants(this.channel?.id!).subscribe((value) => {
      this.participants = value.users;
    });
  }

  getTime() {
    if (this.channel!.lastMessageCreatedAt) {
      return new Date(this.channel!.lastMessageCreatedAt!).getHours()+ "." + new Date(this.channel!.lastMessageCreatedAt!).getMinutes().toString().padStart(2, "0");
    }
    return "";
  }

  shouldShowMessage() {
    return this.channel?.type !== "password-protected" && this.participants?.some((user) =>
      user.id === this.authenticatedUser?.id)
  }

  showDialogName() {
    if (this.channel?.type === "dialog") {
      return this.participants!.filter((user) => {return user.id !== this.authenticatedUser!.id!})[0].name
    }
    else {
      return this.channel?.name
    }
  }

  showPicture() {
    if (this.channel?.type === "dialog") {
      return this.participants!.filter((user) => {return user.id !== this.authenticatedUser!.id!})[0].picture
    }
    else {
      return this.channel?.picture
    }
  }
}
