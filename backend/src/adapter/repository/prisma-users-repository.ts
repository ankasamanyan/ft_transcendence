import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {User} from "../../domain/user";
import {UserResponse, UsersResponse} from "../dto/users-response";

@Injectable()
export class PrismaUsersRepository {
    constructor(private prisma: PrismaService) {

    }

    async initializeUsers() {
        if (await this.prisma.user.count() === 0) {
            await this.prisma.user.createMany({
                data: [
                    {name: "Anahit", intra_login: "@akasaman", picture: "assets/placeholderAvatar.jpeg"},
                    {name: "Tania", intra_login: "@tfedoren", picture: "assets/placeholderComrade.jpeg"},
                    {name: "Cedric", intra_login: "@cerdelen", picture: "assets/placeholderComrade2.jpeg"},
                    {name: "Krisi", intra_login: "@kmilchev", picture: "assets/placeholderComrade3.jpeg"},
                    {name: "Santiago", intra_login: "@stena-he", picture: "assets/placeholderComrade4.jpeg"},
                    {name: "Fedia", intra_login: "@fstaryk", picture: "assets/placeholderComrade5.jpeg"},
                    {name: "Wolf", intra_login: "@wmardin", picture: "assets/placeholderComrade6.jpeg"},
                ]
            });
        }
    }

    async addUser(user: User) {
        await this.prisma.user.create({
                data: {
                    name: user.name,
                    intra_login: user.intraLogin,
                    picture: user.picture
                }
            }
        );
    }

    async getUserById(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        });
        return new UserResponse(user.id, user.name, user.intra_login, user.picture);
    }

    async getUsers(userId: number) {
        const users = await this.prisma.user.findMany({
            where: {
                id: {
                    not: Number(userId)
                }
            }
        });
        return new UsersResponse(users.map((user) => {
            return new UserResponse(
                user.id,
                user.name,
                user.intra_login,
                user.picture);
        }));
    }


}