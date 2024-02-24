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

export type MatchHistoryDto = {
    name: string 
    username: string
    opponentName: string
    opponentUsername: string
    myMatchResult: number
    opponentMatchResult: number
    profilePicture: string
    opponentProfilePicture: string
}