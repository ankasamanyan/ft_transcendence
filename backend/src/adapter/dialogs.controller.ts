import {Controller, Get, Param} from '@nestjs/common';
import {DialogsService} from "../service/dialogs.service";

@Controller('/dialogs/')
export class DialogsController {
  constructor(private dialogsService: DialogsService) {}

  @Get(':userId')
  getDialogs(@Param('userId') userId: number) {
    return this.dialogsService.getDialogs(userId);
  }
}
