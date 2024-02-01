import {UsersRepository} from "../../domain/users-repository";
import {PrismaService} from "../../service/prisma.service";

export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService) {

    }

    getUsers(userId: string) {
    }
}