import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { promises } from 'dns';

class GameRequestDto {
    constructor(
      public gameId:number,
      public userId:number,
      public paddleMove:number,
    ){}
  }

class GameResponsetDto {
    constructor(
      public gameId:number,
      public paddleLeft:number,
      public paddleRight:number,
    ){}
  }

@Injectable()
export class GameService {

    constructor(private prismaService: PrismaService) {

    }

    async updatePaddle(gameRequestDto: GameRequestDto): Promise<GameResponsetDto> {
        console.log("The time has come");
        return new GameResponsetDto(1,100,200);
    }
}
