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
@WebSocketGateway({cors: {origin: '*'}})
export class GameGateway {

  @WebSocketServer()
  server: Server;


  constructor(
    private gameService: GameService) {

  }

  @SubscribeMessage('paddleArrowUp')
  async paddleArrowUp(@MessageBody() gameRequestDto:GameRequestDto) {
    const response = await this.gameService.updatePaddle(gameRequestDto);
    this.server.emit('GameUpdate', response);
    
  }
  
  @SubscribeMessage('paddleArrowDown')
  async paddleArrowDown(@MessageBody() gameRequestDto:GameRequestDto) {
    const response = await this.gameService.updatePaddle(gameRequestDto);
    this.server.emit('GameUpdate', response);
  }

  @SubscribeMessage('invitationToPlay')
  async invite(@MessageBody() request: UsersRequest) {
    await this.gameService.invite(UsersRequest.toDomain(request));
    this.server.emit("invitationSent");
  }
}
