import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent {

  @Input() userId!: number;
  
  public placeHolderMessage: string = 'You will see something here, when you have at least one Achievement 🚀✨'
  
  public achievementList: any[] = [];
}
