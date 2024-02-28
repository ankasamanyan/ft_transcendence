import {Component, Input, OnInit} from '@angular/core';
import {ChannelMessage} from "../../../domain/channel-message";
import {User} from "../../../domain/user";
import {SharedDataService} from "../../../service/shared-data.service";
import {UsersService} from "../../../service/users.service";
import {BlockedUsersService} from "../../../service/blocked-users.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  message: ChannelMessage | undefined;

  authenticatedUser: User | undefined;
  isSenderBlockedByUs: boolean = true;

  constructor(
      private sharedDataService: SharedDataService,
      private userService: UsersService,
      private blockedUserService: BlockedUsersService) {}

  ngOnInit() {
    this.sharedDataService.getMyUserId$().subscribe((value) => {
      this.userService.getUserById(value).subscribe((user) => {
        this.authenticatedUser = user;
        this.isSenderBlocked();
      });
    });
  }

  determineColorPosition() {
    if (this.message?.senderId == this.authenticatedUser?.id)
      return "background-color: var(--color-orange); color: white; display: block; margin-left: auto;"
    else
      return "background-color: var(--color-light-blue);"
  }

  getTime() {
    return new Date(this.message!.created_at).getHours()+ "." + new Date(this.message!.created_at).getMinutes().toString().padStart(2, "0");
  }

  isSenderBlocked() {
    this.blockedUserService.isBlocked(this.authenticatedUser!.id!, this.message?.senderId!).subscribe((value) => {
      this.isSenderBlockedByUs = value;
    })
  }
}
