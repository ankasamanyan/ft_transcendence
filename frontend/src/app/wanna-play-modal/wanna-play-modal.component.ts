import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User, Users} from "../domain/user";
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-wanna-play-modal',
  templateUrl: './wanna-play-modal.component.html',
  styleUrls: ['./wanna-play-modal.component.css']
})
export class WannaPlayModalComponent {
  @Input()
  whoInvitedMeToPlay: User | undefined;

  @Output()
  modalClose = new EventEmitter<void>();

  @Input()
  authenticatedUser: User | undefined;

  constructor(private gameService: GameService) {

  }

  rejectInvitation() {
    this.gameService.decline(new Users([this.whoInvitedMeToPlay!, this.authenticatedUser!]))
    this.modalClose.emit();
  }

  acceptInvitation() {
    this.gameService.accept(new Users([this.whoInvitedMeToPlay!, this.authenticatedUser!]))
    this.modalClose.emit()
  }
}
