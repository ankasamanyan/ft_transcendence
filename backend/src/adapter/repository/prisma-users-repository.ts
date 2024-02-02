import {UsersRepository} from "../../domain/users-repository";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService) {

    }

    getUsers(userId: number) {
    }
}