import {Users} from "../../domain/user";
import {BlockedUsersRepository} from "../../domain/blocked-users-repository";
import {PrismaService} from "../../service/prisma.service";

export class PrismaBlockedUsersRepository implements BlockedUsersRepository {
    constructor(private prisma: PrismaService) {

    }
    blockUser(users: Users) {

    }
}