import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { OnInit } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { SharedDataService } from '../service/shared-data.service';
import { User } from '../domain/user';
import { UsersService } from '../service/users.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OurSocket } from '../socket/socket';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})


  export class ProfileComponent implements OnInit{

  @ViewChild('statusRef') statusRef!: ElementRef;

  public status: string = '';

  public user!: User;

  public userId!: number;
  
  public selectedMenuItem: string = 'friends';
  
  
  constructor(
    private socket: OurSocket,
    private sharedDataService: SharedDataService,
    private usersService: UsersService,
    private httpClient: HttpClient) {

      // this.server.emit("UserLogIn", {userId: socket.handshake.headers.id});

    }
  
  ngOnInit(): void {

    this.socket.on("UserLogIn",({userId}: {userId: number}) => {
      if (userId == this.userId) {
        this.status = "Online";
      }
    });
    
    this.socket.on("UserLogOut",({userId}: {userId: number}) => {
      if (userId == this.userId) {
        this.status = "Offline";
      }
    });
    this.sharedDataService.getData$()
      .subscribe((data) => {
        this.userId = data;
      });
      
    this.usersService.getUserById(this.userId)
      .subscribe((user) => {
        this.user = user;
      });
    
    this.httpClient.get<any>("http://localhost:3000/users/getStatus/" + this.userId)
    .subscribe((data: {status: string})=> {
      this.status = data.status;
      console.log("THIS STATUS: "+this.status);
      console.log("THIS ID: "+ this.userId);
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Online':
        return '#507346';
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
