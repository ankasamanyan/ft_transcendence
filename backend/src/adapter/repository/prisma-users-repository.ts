import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {User} from "../../domain/user";
import {UserResponse, UsersResponse} from "../dto/users-response";

interface UserRawSql {
  id: number,
  name: string,
  intra_login: string,
  picture: string,
  email: string,
  is_authenticated: boolean,
  games: any,
  tfa_enabled: boolean,
  tfa_secret: string,
  online: boolean
}

@Injectable()
export class PrismaUsersRepository {
  constructor(private prisma: PrismaService) {

  }

  async initializeUsers() {

    if ((await this.prisma.user.count()) === 0) {
      await this.prisma.$transaction([
       this.prisma.user.createMany({
        data: [
          {name: "Anahit", intra_login: "@akasaman", picture: "assets/placeholderAvatar.jpeg"},
          {name: "Tania", intra_login: "@tfedoren", picture: "assets/placeholderComrade.jpeg"},
          {name: "Cedric", intra_login: "@cerdelen", picture: "assets/placeholderComrade2.jpeg"},
          {name: "Krisi", intra_login: "@kmilchev", picture: "assets/placeholderComrade3.jpeg"},
          {name: "Santiago", intra_login: "@stena-he", picture: "assets/placeholderComrade4.jpeg"},
          {name: "Fedia", intra_login: "@fstaryk", picture: "assets/placeholderComrade5.jpeg"},
          {name: "Wolf", intra_login: "@wmardin", picture: "assets/placeholderComrade6.jpeg"},
        ]
      }),
      this.prisma.status.createMany({
        data: [
          {userId: Number(1), status: 'available'},
          {userId: Number(2), status: 'available'},
          {userId: Number(3), status: 'available'},
          {userId: Number(4), status: 'available'},
          {userId: Number(5), status: 'available'},
          {userId: Number(6), status: 'available'},
          {userId: Number(7), status: 'available'},
        ]
      })
    ]);
    };
  
  }

  async isUniqueName(username: string) {
    const shortenedName = username.substring(0,15)
    const isUnique = await this.prisma.user.findFirst({
      where: {
        name: shortenedName
      }
    });
    return isUnique === null;
  }

  async updateUser(user: User) {
    const matchingName = await this.prisma.user.findFirst({
      where: {
        name: user.name
      }
    });
    if (matchingName !== null)
      return false;
    await this.prisma.user.updateMany({
      where: {
        id: Number(user.id)
      },
      data: {
        name: user.name.substring(0,15),
        picture: user.picture,
        tfa_enabled: user.tfa_enabled
      }
    });
    return true;
  }



  async addUser(user: User) {
    await this.prisma.$transaction([
     this.prisma.user.create({
          data: {
            name: user.name.substring(0,15),
            intra_login: user.intraLogin,
            picture: user.picture,
            email: user.email,
            is_authenticated: user.isAuthenticated,
            tfa_enabled: user.tfa_enabled,
            tfa_secret: user.tfa_secret,
            online: false
          }
        }
    ),
    this.prisma.status.create({
			data: {
				userId: Number(user.id),
				status: 'available'
			}
		}),
  ]);
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: Number(userId)
      }
    });
    if (user) {
      return new UserResponse(
          user.id,
          user.name,
          user.intra_login,
          user.picture,
          user.email,
          user.is_authenticated,
          user.tfa_enabled,
          user.tfa_secret);
    }
    return ;
  }

  async getUsers(userId: number) {
    const userIdAsInteger = Number(userId);
    const users = await this.prisma.$queryRaw<[UserRawSql]>`
        SELECT *
        FROM "User"
        WHERE "id" != ${userIdAsInteger}
          AND "id" NOT IN (SELECT "blockedId"
            FROM "BlockedUser"
            WHERE "blockerId" = ${userIdAsInteger})
    `;
    return new UsersResponse(users.map((user) => {
      return new UserResponse(
          user.id,
          user.name,
          user.intra_login,
          user.picture,
          user.email,
          user.is_authenticated,
          user.tfa_enabled,
          user.tfa_secret);
    }));
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({});
    return new UsersResponse(
      users.map((user) => {
      return new UserResponse(
          user.id,
          user.name,
          user.intra_login,
          user.picture,
          user.email,
          user.is_authenticated,
          user.tfa_enabled,
          user.tfa_secret);
    }));
  }

  async getStatus(userId: number) {
    ////console.log(userId)
    ////console.log("in getStatus")
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (user) {
      if (user.online == false) {
        return {status: "Offline"}          
      }
      const runningGames = await this.prisma.game.findMany({
        where: {
          finished: false,
          OR: [
            { player1: userId },
            { player2: userId }
          ]
        }
      })
      if (runningGames.length > 0) {
        ////console.log("return playing")
        return {status: "Playing"}      
      }
      ////console.log("return online")
      return {status: "Online"}      
    } else {
      ////console.log("return unknown user")
      return {status: "unknown"}      
    }
  }
}