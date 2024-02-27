import { Component, Input, OnInit } from '@angular/core';
import { UserStatisticsService } from 'src/app/service/user-statistics.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  @Input() userId!: number;
  
  public placeHolderMessage: string = 'You will see something here, when you have at least one Achievement 🚀✨'
  
  public userWins!: number;

  public achievementList: string[] = [];

  public bronze : string = "Congratulations! You get a bronze award.";
  public silver: string = "Moving up to silver! Well done!";
  public gold: string = "You win the gold!";
  public platinum: string = "Unbelievable! The platinum achievment goes to you!"

  constructor (
    private userStatisticsService: UserStatisticsService
  ) {}

  ngOnInit(): void {
    this.userStatisticsService.getWins(this.userId)
      .subscribe(userWins => {
        this.userWins = userWins;
      });
    }

  getAchievements() {
     if (this.userWins == null)
       return [this.placeHolderMessage];
    if (this.userWins == 1)
      return [this.bronze];
    if (this.userWins == 2)
      return [this.bronze, this.silver];
    if (this.userWins == 3)
      return [this.bronze, this.silver, this.gold];
    return [this.bronze, this.silver, this.gold, this.platinum];
  }


  }
