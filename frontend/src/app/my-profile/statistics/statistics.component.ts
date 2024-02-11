import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent {

  public placeHolderMessage: string = "You will see something here, once you start playing << THE PONG >> 🎯✨"

  userWins: number = 25;

  userLosses: number = 40;

}
