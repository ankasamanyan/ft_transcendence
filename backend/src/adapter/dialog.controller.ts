import {Controller, Get, Param} from '@nestjs/common';
import {DialogService} from "../service/dialog.service";
import {of} from "rxjs";
import {SelectedDialogResponse} from "./dto/selected-dialog-response";

@Controller('/selected-dialog/')
export class DialogController {
  constructor(private dialogService: DialogService) {}

  @Get(':senderId/:receiverId')
  getDialog(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
    return of(SelectedDialogResponse.fromDomain(this.dialogService.getDialog(senderId, receiverId)));
  }
}
