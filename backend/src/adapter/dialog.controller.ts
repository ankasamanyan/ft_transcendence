import {Controller, Get, Param} from '@nestjs/common';
import {DialogService} from "../service/dialog.service";

@Controller()
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}

  @Get('/selected-dialog/:senderId:receiverId')
  getDialog(@Param('senderId') senderId, @Param('receiverId') receiverId): string {
    return this.dialogService.getDialog(senderId, receiverId);
  }
}
