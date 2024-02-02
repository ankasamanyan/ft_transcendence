import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {User} from "../../domain/user";

@Injectable()
export class PrismaUsersRepository {
    constructor(private prisma: PrismaService) {

    }

    async initializeUsers() {
        if (await this.prisma.user.count() === 0) {
            await this.prisma.user.createMany({
                data: [
                    {name: "Anahit", picture: "assets/placeholderAvatar.jpeg"},
                    {name: "Tania", picture: "assets/placeholderComrade.jpeg"},
                    {name: "Cedric", picture: "assets/placeholderComrade2.jpeg"},
                    {name: "Krisi", picture: "assets/placeholderComrade3.jpeg"},
                    {name: "Santiago", picture: "assets/placeholderComrade4.jpeg"},
                    {name: "Fedia", picture: "assets/placeholderComrade5.jpeg"},
                    {name: "Wolf", picture: "assets/placeholderComrade6.jpeg"},
                ]
            });
        }
    }
    async addUser(user: User) {
        await this.prisma.user.create({
            data: {
                name: user.name,
                picture: user.pictureUrl
            }}
        );
    }

    getUsers(userId: number) {
    }
}