import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { ChatComponent } from './chat/chat.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { DialogsComponent } from './chat/dialogs/dialogs.component';
import { SelectedDialogComponent } from './chat/selected-dialog/selected-dialog.component';
import { DialogComponent } from './chat/dialogs/dialog/dialog.component';
import { MessageComponent } from './chat/selected-dialog/message/message.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { GameComponent } from './game/game.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';
import { ExitModalComponent } from './navigation-bar/exit-modal/exit-modal.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SelectedDialogHeaderComponent } from './chat/selected-dialog/selected-dialog-header/selected-dialog-header.component';
import { BlockModalComponent } from './chat/selected-dialog/selected-dialog-header/block-modal/block-modal.component';
import { InvitationToPlayReceivedNotificationComponent } from './chat/selected-dialog/selected-dialog-header/invitation-to-play-received-notification/invitation-to-play-received-notification.component';
import { CreateChannelModalComponent } from './chat/dialogs/create-channel-modal/create-channel-modal.component';
import { SelectOptionComponent } from './chat/dialogs/create-channel-modal/select-option/select-option.component';
import { FriendsComponent } from './my-profile/friends/friends.component';
import { StatisticsComponent } from './my-profile/statistics/statistics.component';
import { AchievementsComponent } from './my-profile/achievements/achievements.component';
import { MatchHistoryComponent } from './my-profile/match-history/match-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PieChartComponent } from './my-profile/statistics/pie-chart/pie-chart.component';
import { InvitationToBeFriendsReceivedNotificationComponent } from './chat/selected-dialog/selected-dialog-header/invitation-to-be-friends-received-notification/invitation-to-be-friends-received-notification.component';
import { EditChannelModalComponent } from './chat/selected-dialog/selected-dialog-header/edit-channel-modal/edit-channel-modal.component';
import { SettingsComponent } from './my-profile/settings/settings.component';
import { SharedDataService } from './service/shared-data.service';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { ParticipantComponent } from './chat/selected-dialog/selected-dialog-header/edit-channel-modal/participant/participant.component';
import { LeaveChannelModalComponent } from './chat/selected-dialog/selected-dialog-header/leave-channel-modal/leave-channel-modal.component';
import {TokenInterceptor} from "./token.interceptor";
import { UserUnblockedNotificationComponent } from './chat/selected-dialog/selected-dialog-header/user-unblocked-notification/user-unblocked-notification.component';
import { WannaPlayModalComponent } from './wanna-play-modal/wanna-play-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    NavigationBarComponent,
    DialogsComponent,
    SelectedDialogComponent,
    DialogComponent,
    MessageComponent,
    MyProfileComponent,
    GameComponent,
    AuthorizationPageComponent,
    ExitModalComponent,
    SelectedDialogHeaderComponent,
    BlockModalComponent,
    InvitationToPlayReceivedNotificationComponent,
    CreateChannelModalComponent,
    SelectOptionComponent,
    FriendsComponent,
    StatisticsComponent,
    AchievementsComponent,
    MatchHistoryComponent,
    PieChartComponent,
    InvitationToBeFriendsReceivedNotificationComponent,
    EditChannelModalComponent,
    SettingsComponent,
    ParticipantComponent,
    LeaveChannelModalComponent,
    UserUnblockedNotificationComponent,
    WannaPlayModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    RouterModule.forRoot([
      { path: '', component: AuthorizationPageComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'game', component: GameComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'authorization', component: AuthorizationPageComponent },
    ]),
  ],
  providers: [SharedDataService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},],
  bootstrap: [AppComponent],
  exports: [
    MatBadgeModule,
    MatBadge,
  ]
})
export class AppModule {
}
