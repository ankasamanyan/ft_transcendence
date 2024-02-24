import { Component, Input, OnInit } from '@angular/core';
import { UserStatisticsService } from 'src/app/service/user-statistics.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit{
  
  @Input() userId!: number;

  public userWins!: number;
  
  public userLosses!: number;
  
  public placeHolderMessage: string = "You will see something here, once you start playing << THE PONG >> 🎯✨"

  constructor(private userStatisticsService: UserStatisticsService) {}

  ngOnInit(): void {
    this.userStatisticsService.getWins(this.userId)
      .subscribe(userWins => {
        this.userWins = userWins;
      });

    this.userStatisticsService.getLosses(this.userId)
      .subscribe(userLosses => {
        this.userLosses = userLosses;
      });
  }

}
