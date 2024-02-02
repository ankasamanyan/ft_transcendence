import {UsersRepository} from "../../domain/users-repository";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {User} from "../../domain/user";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService) {

    }
    addUser(user: User) {
    }

    getUsers(userId: number) {
    }
}