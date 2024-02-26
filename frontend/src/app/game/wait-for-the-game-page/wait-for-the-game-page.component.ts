import {Component, OnInit} from '@angular/core';
import {GameService} from "../../service/game.service";
import {OurSocket} from "../../socket/socket";
import {SharedDataService} from "../../service/shared-data.service";
import {UsersService} from "../../service/users.service";
import {User} from "../../domain/user";

@Component({
  selector: 'app-wait-for-the-game-page',
  templateUrl: './wait-for-the-game-page.component.html',
  styleUrls: ['./wait-for-the-game-page.component.css']
})
export class WaitForTheGamePageComponent implements OnInit {
  authenticatedUser: User | undefined;
  isInTheQueue: boolean = false;
  constructor(
      private sharedDataService: SharedDataService,
      private userService: UsersService,
      private gameService: GameService,
      private socket: OurSocket) {
    socket.on("checkQueue", ({userId}: {userId: number}) => {
      this.isInTheQueue = userId === this.authenticatedUser!.id;
    })
  }

  ngOnInit() {
    this.sharedDataService.getMyUserId$().subscribe((value) => {
      this.userService.getUserById(value).subscribe((user) => {
        this.authenticatedUser = user;
      });
    });
    this.gameService.checkQueue();
  }

  joinQueue() {
    this.gameService.joinQueue(this.authenticatedUser?.id!);
  }
}
