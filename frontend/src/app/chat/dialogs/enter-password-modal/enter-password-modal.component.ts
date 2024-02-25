import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../domain/user";
import {ChannelService} from "../../../service/channel.service";
import {ConfirmPassword} from "../../../domain/confirm-password";
import {Channel} from "../../../domain/channel";

@Component({
  selector: 'app-enter-password-modal',
  templateUrl: './enter-password-modal.component.html',
  styleUrls: ['./enter-password-modal.component.css']
})
export class EnterPasswordModalComponent {
  @Output()
  modalClose = new EventEmitter<void>();

  @Output()
  correctPasswordSubmitted = new EventEmitter<void>();

  @Input()
  selectedChannelId: number | undefined;

  channel: Channel | undefined;
  enteredPassword: string | undefined;
  showTryAgainText: boolean = false;

  constructor(private channelService: ChannelService) {}

  passwordEntered() {
    return this.enteredPassword !== "" && this.enteredPassword !== undefined;
  }

  submitPassword() {
    if (this.selectedChannelId) {
      this.channelService.getChannelDetailsById(this.selectedChannelId).subscribe((value) => {
        this.channel = value;
        this.channelService.confirmPassword(new ConfirmPassword(this.enteredPassword!, this.channel)).subscribe((value) => {
          if (value) {
            this.showTryAgainText = false;
            this.correctPasswordSubmitted.emit();
          }
          else {
            this.showTryAgainText = true;
          }
        });
      });
    }
  }
}
