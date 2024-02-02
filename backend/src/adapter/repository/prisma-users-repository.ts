import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {User} from "../../domain/user";

@Injectable()
export class PrismaUsersRepository {
    constructor(private prisma: PrismaService) {

    }
    async addUser(user: User) {
        await this.prisma.user.create({
            data: {
                name: user.name,
                picture: user.name
            }}
        );
    }

    getUsers(userId: number) {
    }
}