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

export type PaddleUpdateResponseDto ={
    gameId:number
    paddleLeft: number
    paddleRight: number
}

export type GameRequestDto = {
    gameId:number
    userId:number
    paddleMove:number
}

export type GameOverDto = {
    gameId: number
    winnerId: number
    loserId: number
}

export type BallUpdateDto = {
    gameId:number
    ballPos: [number, number]
}

export class MatchHistoryDto  {
    constructor(
        public name: string,
        public username: string,
        public opponentName: string,
        public opponentUsername: string,
        public myMatchResult: number,
        public opponentMatchResult: number,
        public profilePicture: string,
        public opponentProfilePicture: string) {}
}

export type gameReadyDto = {
    invitedId:number
    beenInvitedId: number
}