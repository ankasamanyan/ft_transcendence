import {Component, Input, OnInit} from '@angular/core';
import {ChannelMessage} from "../../../domain/channel-message";
import {User} from "../../../domain/user";
import {SharedDataService} from "../../../service/shared-data.service";
import {UsersService} from "../../../service/users.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  message: ChannelMessage | undefined;

  authenticatedUser: User | undefined;

  constructor(
      private sharedDataService: SharedDataService,
      private userService: UsersService) {}

  ngOnInit() {
    this.sharedDataService.getData$().subscribe((value) => {
      this.userService.getUserById(value).subscribe((user) => {
        this.authenticatedUser = user;
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
}
