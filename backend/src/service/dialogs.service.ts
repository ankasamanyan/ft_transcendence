import {Injectable} from '@nestjs/common';
import {PrismaDialogsRepository} from "../adapter/repository/prisma-dialogs-repository";
import {from} from "rxjs";

@Injectable()
export class DialogsService {

  constructor(public dialogsRepository: PrismaDialogsRepository) {
  }

  getDialogs(userId: number) {
    return from(this.dialogsRepository.getDialogs(userId));
  }
}
