import { PrismaService } from '../../service/prisma.service';
import {Injectable} from "@nestjs/common";
import { MatchHistoryDto } from '../dto/game.dto';

interface MatchHistory {
    name: string,
    username: string,
    opponentname: string,
    opponentusername: string,
    mymatchresult: number,
    opponentmatchresult: number,
    profilepicture: string,
    opponentprofilepicture: string
}

@Injectable()
export class PrismaGameRepository {
    constructor(private prisma: PrismaService) {}  

    async matchHistory(userId: number) {
        const userIdAsInteger = Number(userId);
        const matchHistory = await this.prisma.$queryRaw<MatchHistory[]>`
        select 
               u1.name            as name,
               u1.intra_login     as username,
               u2.name            as opponentname,
               u2.intra_login     as opponentusername,
               g.score1           as mymatchresult,
               g.score2           as opponentmatchresult,
               u1.picture         as profilepicture,
               u2.picture         as opponentprofilepicture
        from "Game" g
                 LEFT JOIN "User" u1 on g."player1" = u1.id
                 LEFT JOIN "User" u2 on g."player2" = u2.id
        where g.player1 = ${userIdAsInteger} OR g.player2 = ${userIdAsInteger}
    `;
    return matchHistory.map((value) => {
        return new MatchHistoryDto(
            value.name,
            value.username,
            value.opponentname,
            value.opponentusername,
            value.mymatchresult,
            value.opponentmatchresult,
            value.profilepicture,
            value.opponentprofilepicture,
        )});
    }

    async gameOver(gameId: number, finalScore1: number, finalScore2: number) {
        console.log("trying to update database");
        const datbaseGameObj = await this.prisma.game.update({
            where: {
                id: gameId
            },
            data: {
                score1: finalScore1,
                score2: finalScore2,
                finished: true
            }
        });
        await this.prisma.user.update({
            where: {
                id: datbaseGameObj.player1,
            },
            data: {
                games: {
                    push: datbaseGameObj.id ,
                }
            }
        });
        await this.prisma.user.update({
            where: {
                id: datbaseGameObj.player2,
            },
            data: {
                games: {
                    push: datbaseGameObj.id ,
                }
            }
        })
    }
}