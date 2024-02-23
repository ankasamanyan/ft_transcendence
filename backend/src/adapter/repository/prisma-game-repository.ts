import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaGameRepository {
	constructor(private prisma: PrismaService) {

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