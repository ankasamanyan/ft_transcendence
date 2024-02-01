import {DialogsRepository} from "../../domain/dialogs-repository";
import {PrismaService} from "../../service/prisma.service";

export class PrismaDialogsRepository implements DialogsRepository {
    constructor(private prisma: PrismaService) {

    }

    getDialogs(authenticatedUser: string) {
    }
}