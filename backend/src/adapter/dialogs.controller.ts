import {Controller, Get, Param} from '@nestjs/common';
import {DialogsService} from "../service/dialogs.service";
import { DialogsResponse } from 'src/adapter/dto/dialogs-response';
import {of} from "rxjs";

@Controller('/dialogs/')
export class DialogsController {
  constructor(private dialogsService: DialogsService) {}

  @Get(':userId')
  getDialogs(@Param('userId') userId: number) {
    return of(DialogsResponse.fromDomain(this.dialogsService.getDialogs(userId)));
  }
}
