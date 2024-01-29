import {Component, EventEmitter, Output} from '@angular/core';
import {Dialog} from "../../domain/dialog";
import {DialogsService} from "../../service/dialogs.service";
import {UsersService} from "../../service/users.service";
import {Users} from "../../domain/user";

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent {
  dialogs: Dialog[] = [];
  displayedDialogs: Dialog[] = [];
  showCreateChannelModal: boolean = false;
  selectedPerson: string | undefined;
  users: Users | undefined;

  @Output()
  selectedPersonChanged = new EventEmitter<string>();

  constructor(dialogsService: DialogsService, usersService: UsersService) {
    dialogsService.getDialogs("Anahit").subscribe((value)  => {
      this.dialogs = value.dialogs!;
      this.changeSelectedPerson(this.dialogs[0].name!);
      this.displayedDialogs = this.dialogs;
    });
    usersService.getUsers("Anahit").subscribe((value)  => {
      this.users = value;
    });
  }

  find(dialogToSearchFor: string) {
    if (dialogToSearchFor == "") {
      this.displayedDialogs = this.dialogs;
    } else {
      this.displayedDialogs = this.dialogs
        .filter((dialog) => dialog.name?.toUpperCase().startsWith(dialogToSearchFor.toUpperCase()));
    }
  }

  changeSelectedPerson(selectedPerson: string) {
    this.selectedPerson = selectedPerson;
    this.selectedPersonChanged.emit(selectedPerson);
  }
}
