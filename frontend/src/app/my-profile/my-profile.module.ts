import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { MatchHistoryComponent } from './match-history/match-history.component';
import { StatisticsComponent } from './statistics/statistics.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'friends',
        component: FriendsComponent,
      },
      {
        path: 'achievement',
        component: AchievementsComponent,
      },
      {
        path: 'match-history',
        component: MatchHistoryComponent,
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
    ])
  ]
})
export class MyProfileModule { }
