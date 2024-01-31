import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SelectedDialogHeaderComponent } from './chat/selected-dialog/selected-dialog-header/selected-dialog-header.component';
import { BlockModalComponent } from './chat/selected-dialog/selected-dialog-header/block-modal/block-modal.component';
import { InvitationReceivedNotificationComponent } from './chat/selected-dialog/selected-dialog-header/invitation-received-notification/invitation-received-notification.component';
import { CreateChannelModalComponent } from './chat/dialogs/create-channel-modal/create-channel-modal.component';
import { SelectOptionComponent } from './chat/dialogs/create-channel-modal/select-option/select-option.component';
import { FriendsComponent } from './my-profile/friends/friends.component';
import { StatisticsComponent } from './my-profile/statistics/statistics.component';
import { AchievementsComponent } from './my-profile/achievements/achievements.component';
import { MatchHistoryComponent } from './my-profile/match-history/match-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import {FormsModule} from "@angular/forms";

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
    InvitationReceivedNotificationComponent,
    CreateChannelModalComponent,
    SelectOptionComponent,
    FriendsComponent,
    StatisticsComponent,
    AchievementsComponent,
    MatchHistoryComponent,
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
    RouterModule.forRoot([
      { path: '', component: ChatComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'game', component: GameComponent },
      { path: 'chat', component: ChatComponent },
    ]),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
