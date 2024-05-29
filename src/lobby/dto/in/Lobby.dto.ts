export type LobbyDto = {
    lobbyName: string;
    gameId: string;
    lobby_description: string;
    player1: null | string;
    player2: null | string;
    password?: string;
}