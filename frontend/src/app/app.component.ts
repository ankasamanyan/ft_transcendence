import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersService} from "./service/users.service";
import {MessageService} from "./service/message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
      private modalService: NgbModal,
      public usersService: UsersService,
      public messageService: MessageService
  ) {
    this.usersService.initializeUsers().subscribe();
    this.messageService.initializeMessages().subscribe();
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
