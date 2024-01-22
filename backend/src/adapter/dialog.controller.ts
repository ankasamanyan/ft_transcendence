import {Controller, Get, Param} from '@nestjs/common';
import {DialogService} from "../service/dialog.service";

@Controller('/selected-dialog/')
export class DialogController {
  constructor(private dialogService: DialogService) {}

  @Get(':senderId/:receiverId')
  getDialog(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
    return this.dialogService.getDialog(senderId, receiverId);
  }
}
