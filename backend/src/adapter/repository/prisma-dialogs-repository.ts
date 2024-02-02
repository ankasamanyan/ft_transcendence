import {DialogsRepository} from "../../domain/dialogs-repository";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaDialogsRepository implements DialogsRepository {
    constructor(private prisma: PrismaService) {

    }

    getDialogs(userId: number) {
    }
}