import {DialogsRepository} from "../../domain/dialogs-repository";

export class PrismaDialogsRepository implements DialogsRepository {
    constructor() {

    }

    getDialogs(authenticatedUser: string) {
    }
}