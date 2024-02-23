import {Module} from '@nestjs/common';
import {GameGateway} from './game.gateway';
import {PrismaService} from "../../service/prisma.service";
import {GameService} from "../../service/game-service";
import {PrismaGameInvitationRepository} from "../../adapter/repository/prisma-game-invitation-repository";
import { PrismaGameRepository } from 'src/adapter/repository/prisma-game-repository';

@Module({
  providers: [
    GameGateway,
    PrismaService,
    GameService,
    PrismaGameInvitationRepository,
    PrismaGameRepository]
})
export class GameModule {
}
