import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import { MatchHistoryDto } from "../dto/game.dto";

@Injectable()
export class PrismaGameRepository {
    constructor(private prisma: PrismaService) {}  

    async matchHistory(userId: number): Promise<MatchHistoryDto[]> {
        const games = await this.prisma.game.findMany({
            where: {
                OR: [
                    { player1: userId },
                    { player2: userId }
                ]
            }
        });
        const player1_name = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
        return [];
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