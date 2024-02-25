import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Users} from "../../domain/user";
import {UserResponse, UsersResponse} from "../dto/users-response";


interface RawSql {
  id: number,
  name: string,
  intra_login: string,
  picture: string,
  email: string,
  is_authenticated: boolean,
  tfa_enabled: boolean,
}

@Injectable()
export class PrismaBlockedUsersRepository {
  constructor(private prisma: PrismaService) {

  }

  async blockUser(users: Users) {
    await this.prisma.$transaction([
     this.prisma.blockedUser.create({
       data: {
         blockerId: users.users[0].id,
         blockedId: users.users[1].id,
        }
      }),
      this.prisma.friend.deleteMany({
        where: {
          received_user_id: {in: [Number(users.users[0].id), Number(users.users[1].id)]},
          sent_user_id: {in: [Number(users.users[0].id), Number(users.users[1].id)]}
        }
      }),
      this.prisma.gameInvitation.deleteMany({
        where: {
          initiatorId: {in: [Number(users.users[0].id), Number(users.users[1].id)]},
          recipientId: {in: [Number(users.users[0].id), Number(users.users[1].id)]}
        }
      })
    ]);
    
  }

  async unblockUser(blockerId: number, blockedId: number) {
    await this.prisma.blockedUser.deleteMany({
      where: {
        AND: [
          {blockerId: Number(blockerId)},
          {blockedId: Number(blockedId)}
        ]
      }
    });
  }

  async getBlockedUsers(blockerId: number) {
    const blockerIdAsInt = Number(blockerId);
    const blockedUsers = await this.prisma.$queryRaw<RawSql[]>`
        SELECT b."blockedId"      as id,
               u.name             as name,
               u.intra_login      as intra_login,
               u.picture          as picture,
               u.email            as email,
               u.is_authenticated as is_authenticated,
               u.tfa_enabled      as tfa_enabled
        from "BlockedUser" b
                 LEFT JOIN "User" u on b."blockedId" = u.id
        where b."blockerId" = ${blockerIdAsInt}`
    return new UsersResponse(blockedUsers.map((user) => {
      return new UserResponse(
        user.id,
        user.name,
        user.intra_login,
        user.picture,
        user.email,
          user.is_authenticated,
          user.tfa_enabled,
        );
    }));

  }

  async isBlocked(blockerId: number, blockedId: number) {
    const isBlocked = await this.prisma.blockedUser.findFirst({
      where: {
        blockedId: Number(blockedId),
        blockerId: Number(blockerId)
      }
    });
    return isBlocked !== null;
  }
}