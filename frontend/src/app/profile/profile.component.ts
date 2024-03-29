import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SharedDataService } from '../service/shared-data.service';
import { User } from '../domain/user';
import { UsersService } from '../service/users.service';
import { HttpClient } from '@angular/common/http';
import { OurSocket } from '../socket/socket';
import { GameOverDto, GameStartResponseDto } from '../service/dto/game.dto';
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

  export class ProfileComponent implements OnInit{

  public status: string = '';

  public isThisMe: boolean = false;

  public user!: User;

  public userId!: number;

  host =  environment.ip;
  private backendUrl =  `http://${this.host}:3000`;




  public selectedMenuItem: string = 'friends';

  constructor(
    private socket: OurSocket,
    private sharedDataService: SharedDataService,
    private usersService: UsersService,
    private httpClient: HttpClient) {
    }
  
  ngOnInit(): void {
    this.sharedDataService.getData$()
    .subscribe((data) => {
      this.userId = data;
      //console.log("THIS IS THE CURRENT USER:  " + this.userId);
    });

    this.socket.on("UserLogIn",({userId}: {userId: number}) => {
      if (userId == this.userId) {
        this.status = "Online";
      }
    });

    this.socket.on("gameStarted",(data: GameStartResponseDto) => {
      if (data.player1 == this.userId || data.player2) {
        this.status = "Playing";
      }
    });

    this.socket.on("gameOver", (data: GameOverDto) => {
      if (data.loserId == this.userId || data.winnerId == this.userId) {
        this.getStatus()
      }
    });

    this.getStatus();

    this.sharedDataService.getMyUserId$()
    .subscribe(myUserId => {
      if (myUserId === this.userId){
        this.isThisMe = true;
      } else { this.isThisMe = false}
    });
    this.usersService.getUserById(this.userId)
    .subscribe((user) => {
      this.user = user;
    });
}

  getStatus() {
    this.httpClient.get<any>(`${this.backendUrl}/users/getStatus/` + this.userId)
    .subscribe((data: {status: string})=> {
      this.status = data.status;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Online':
        return '#507850';
      case 'Offline':
        return 'red';
      case 'Playing':
        return 'purple';
      default:
        return 'var(--color-dark blue)';
    }
  }
  selectMenuItem(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }
}
