import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dialog} from "../../domain/dialog";
import {DialogsService} from "../../service/dialogs.service";
import {UsersService} from "../../service/users.service";
import {User, Users} from "../../domain/user";

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {
  dialogs: Dialog[] = [];
  displayedDialogs: Dialog[] = [];
  selectedPerson: User | undefined;
  users: Users | undefined;

  showCreateChannelModal: boolean = false;
  dialogsLoaded: boolean = false;

  @Output()
  selectedPersonChanged = new EventEmitter<User>();

  constructor(private dialogsService: DialogsService, usersService: UsersService) {
    this.getDialogs();
    usersService.getUsers(1).subscribe((value)  => {
      this.users = value;
    });
  }

  ngOnInit(): void {
    this.dialogsService.updateDialogs.next(false);
    this.dialogsService.updateDialogs.subscribe(value => {
      if (value) {
        this.getDialogs();
      }
    });
  }

  find(dialogToSearchFor: string) {
    if (dialogToSearchFor == "") {
      this.displayedDialogs = this.dialogs;
    } else {
      this.displayedDialogs = this.dialogs
        .filter((dialog) => dialog.user.name?.toUpperCase().startsWith(dialogToSearchFor.toUpperCase()));
    }
  }

  changeSelectedPerson(selectedPerson: User) {
    this.selectedPerson = selectedPerson;
    this.selectedPersonChanged.emit(selectedPerson);
  }

  noDialogs() {
    return this.dialogs.length === 0 && this.dialogsLoaded;
  }

  getDialogs() {
    this.dialogsService.getDialogs(1).subscribe((value)  => {
      this.dialogs = value.dialogs!;
      this.changeSelectedPerson(this.dialogs[0].user);
      this.displayedDialogs = this.dialogs;
      this.dialogsLoaded = true;
    });
  }
}
