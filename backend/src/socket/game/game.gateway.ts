import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import {UsersRequest} from "../../adapter/dto/users-request";
import {GameService} from "../../service/game-service";

class GameRequestDto {
  constructor(
    public gameId:number,
    public userId:number,
    public paddleMove:number,
  ){}
}

class GameStartResponseDto {
  constructor(
    public gameId:number,
    public player1:number,
    public player2:number,
  ){}
}

@WebSocketGateway({cors: {origin: '*'}})
export class GameGateway {

  @WebSocketServer()
  server: Server;


  constructor(
    private gameService: GameService) {

  }

  @SubscribeMessage('paddleUpdate')
  async paddleArrowUp(@MessageBody() gameRequestDto:GameRequestDto) {
    console.log("gamepaddle update backend with value");
    console.log(gameRequestDto);
    const response = await this.gameService.updatePaddle(gameRequestDto);
    this.server.emit('GameUpdate', response);  
  }
  

  @SubscribeMessage('invitationToPlay')
  async invite(@MessageBody() request: UsersRequest) {
    await this.gameService.invite(UsersRequest.toDomain(request));
    this.server.emit("invitationSent");
  }

  @SubscribeMessage('startGame')
  async startGame(@MessageBody() data: {user1: number, user2: number}) {
    console.log("startGame message subscribe")
    const responseDto = await this.gameService.startGame(data.user1, data.user2);
    this.server.emit("gameStarted", responseDto);
  }
}
