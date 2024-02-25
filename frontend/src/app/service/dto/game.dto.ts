export type GameStartResponseDto = {
    gameId: number,
    player1: number,
    player2: number,
}

export type GameScoreUpdateDto = {
    gameId:number,
    player1Score:number,
    player2Score:number,
}

export type PaddleUpdateDto ={
      gameId:number
      userId:number
      paddleMove:number
}

export type GameRequestDto = {
     gameId:number
     userId:number
     paddleMove:number
}

export type GameResponsetDto = {
     gameId:number
     paddleLeft:number
     paddleRight:number
     ballPos: [number, number]
}

export class MatchHistoryList {
    history: MatchHistory[];

    constructor(history: MatchHistory[]){
        this.history = history
    }
}

export class MatchHistory {
    public name: string ;
    public username: string;
    public opponentName: string;
    public opponentUsername: string;
    public myMatchResult: number;
    public opponentMatchResult: number;
    public profilePicture: string;
    public opponentProfilePicture: string;

    constructor (
        name: string ,
        username: string,
        opponentName: string,
        opponentUsername: string,
        myMatchResult: number,
        opponentMatchResult: number,
        profilePicture: string,
        opponentProfilePicture: string,
    ) {
        this.name = name;
        this.username = username;
        this.opponentName = opponentName;
        this.opponentUsername = opponentUsername;
        this.myMatchResult = myMatchResult;
        this.opponentMatchResult = opponentMatchResult;
        this.profilePicture = profilePicture;
        this.opponentProfilePicture = opponentProfilePicture; 

    }
}

export class MatchHistoryDto {
    constructor(
        public name: string ,
        public username: string,
        public opponentName: string,
        public opponentUsername: string,
        public myMatchResult: number,
        public opponentMatchResult: number,
        public profilePicture: string,
        public opponentProfilePicture: string,
    ) {

    }
}