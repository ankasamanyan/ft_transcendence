import { PrismaService } from '../../service/prisma.service';
import {Injectable} from "@nestjs/common";
import { MatchHistoryDto } from '../dto/game.dto';
import { Game } from '@prisma/client';
import { stat } from 'fs';

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
    async updateUserStatisticsLoss(userId: number) {
        const stats = await this.prisma.userStatistics.findUnique({
            where: {
                userId: userId,
            }
        });
        if (stats) {
            stats.losses = stats.losses + 1
            await this.prisma.userStatistics.update({
                where: {
                    userId: userId,
                },
                data: stats
            });
        }
    }
    async updateUserStatisticsWin(userId: number) {
        const stats = await this.prisma.userStatistics.findUnique({
            where: {
                userId: userId,
            }
        });
        if (stats) {
            stats.wins = stats.wins + 1
            await this.prisma.userStatistics.update({
                where: {
                    userId: userId,
                },
                data: stats
            });
        }
    }

    async updateUserStatistics(game: Game) {
        if (game.score1 > game.score2) {
            this.updateUserStatisticsLoss(game.player2);
            this.updateUserStatisticsWin(game.player1);
        } else {
            this.updateUserStatisticsLoss(game.player1);
            this.updateUserStatisticsWin(game.player2);
        }
    }

    async pushGameToUserHistory(userId: number, gameId: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        });
        if (!user){
            return ;
        }   
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                games: {
                    push: gameId,
                }
            }
        });
    }

    async gameOver(gameId: number, finalScore1: number, finalScore2: number) {
        const datbaseGameObj: Game = await this.prisma.game.update({
            where: {
                id: gameId
            },
            data: {
                score1: finalScore1,
                score2: finalScore2,
                finished: true
            }
        });
        if (!datbaseGameObj) {
            return ;
        }
        await this.pushGameToUserHistory(datbaseGameObj.player1, datbaseGameObj.id);
        await this.pushGameToUserHistory(datbaseGameObj.player2, datbaseGameObj.id);
        await this.updateUserStatistics(datbaseGameObj);
    }
}