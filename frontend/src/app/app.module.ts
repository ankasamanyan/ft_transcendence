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
import { ProfileComponent } from './profile/profile.component';
import { GameComponent } from './game/game.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';
import { ExitModalComponent } from './navigation-bar/exit-modal/exit-modal.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SelectedDialogHeaderComponent } from './chat/selected-dialog/selected-dialog-header/selected-dialog-header.component';
import { BlockModalComponent } from './chat/selected-dialog/selected-dialog-header/block-modal/block-modal.component';
import { InvitationToPlayReceivedNotificationComponent } from './chat/selected-dialog/selected-dialog-header/invitation-to-play-received-notification/invitation-to-play-received-notification.component';
import { CreateChannelModalComponent } from './chat/dialogs/create-channel-modal/create-channel-modal.component';
import { SelectOptionComponent } from './chat/dialogs/create-channel-modal/select-option/select-option.component';
import { FriendsComponent } from './profile/friends/friends.component';
import { StatisticsComponent } from './profile/statistics/statistics.component';
import { AchievementsComponent } from './profile/achievements/achievements.component';
import { MatchHistoryComponent } from './profile/match-history/match-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PieChartComponent } from './profile/statistics/pie-chart/pie-chart.component';
import { InvitationToBeFriendsReceivedNotificationComponent } from './chat/selected-dialog/selected-dialog-header/invitation-to-be-friends-received-notification/invitation-to-be-friends-received-notification.component';
import { EditChannelModalComponent } from './chat/selected-dialog/selected-dialog-header/edit-channel-modal/edit-channel-modal.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { SharedDataService } from './service/shared-data.service';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { ParticipantComponent } from './chat/selected-dialog/selected-dialog-header/edit-channel-modal/participant/participant.component';
import { LeaveChannelModalComponent } from './chat/selected-dialog/selected-dialog-header/leave-channel-modal/leave-channel-modal.component';
import {TokenInterceptor} from "./token.interceptor";
import { UserUnblockedNotificationComponent } from './chat/selected-dialog/selected-dialog-header/user-unblocked-notification/user-unblocked-notification.component';
import { WannaPlayModalComponent } from './wanna-play-modal/wanna-play-modal.component';
import { EnterPasswordModalComponent } from './chat/dialogs/enter-password-modal/enter-password-modal.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { WaitForTheGamePageComponent } from './game/wait-for-the-game-page/wait-for-the-game-page.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    NavigationBarComponent,
    DialogsComponent,
    SelectedDialogComponent,
    DialogComponent,
    MessageComponent,
    ProfileComponent,
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
    EnterPasswordModalComponent,
    WaitForTheGamePageComponent,
    TwoFactorComponent,
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
            {path: '', component: AuthorizationPageComponent},
            {path: 'profile', component: ProfileComponent},
            {path: 'game', component: GameComponent},
            {path: 'chat', component: ChatComponent},
            {path: 'authorization', component: AuthorizationPageComponent},
            {path: '2-fa', component: TwoFactorComponent},
        ]),
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
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
