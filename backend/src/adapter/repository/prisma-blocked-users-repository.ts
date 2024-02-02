import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Users} from "../../domain/user";

@Injectable()
export class PrismaBlockedUsersRepository {
    constructor(private prisma: PrismaService) {

    }
    blockUser(users: Users) {

    }
}