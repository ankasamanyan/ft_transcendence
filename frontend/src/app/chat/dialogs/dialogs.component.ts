import {Component, EventEmitter, Output} from '@angular/core';
import {Dialog} from "../../domain/dialog";
import {DialogsService} from "../../service/dialogs.service";

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

  @Output()
  selectedPersonChanged = new EventEmitter<string>();

  constructor(dialogsService: DialogsService) {
    dialogsService.getDialogs("Anahit").subscribe((value)  => {
      this.dialogs = value.dialogs!;
      this.changeSelectedPerson(this.dialogs[0].name!);
      this.displayedDialogs = this.dialogs;
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
