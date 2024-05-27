import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyDto } from './dto/in/Lobby.dto';
import { PatchLobbyDto } from './dto/in/PatchLobby.dto';
import { throwErrorHttp } from 'src/error';

@Controller('lobby')
export class LobbyController {
    constructor(private readonly lobbyService: LobbyService){}
    
    @Get('/:lobby_id')
    async getLobby(@Param('lobby_id') lobby_id: string){
        try{
            return await this.lobbyService.getLobbyInformation(lobby_id);
        }
        catch(error){
            throwErrorHttp(error);
          }
    }

    @Post()
    async generateLobby(@Body() lobbyDto: LobbyDto){
        try{
            return await this.lobbyService.createLobby(lobbyDto);
        }
        catch(error){
            throwErrorHttp(error);
          }
    }

    @Delete('/:lobby_id')
    async deleteLobby(@Param('lobby_id') lobby_id: string){
        try{
            return await this.lobbyService.removeLobby(lobby_id);
        }
        catch(error){
            throwErrorHttp(error);
          }
    }

    @Patch()
    async modifyLobby(@Body() patchLobbyDto: PatchLobbyDto){
        try{
            return await this.lobbyService.patchLobby(patchLobbyDto);
        }
        catch(error){
            throwErrorHttp(error);
          }
    }

    @Get('/all')
    async getAllLobby(){
        try{
            return await this.lobbyService.getAllLobbyInformation();
        }
        catch(error){
            throwErrorHttp(error);
          }
    }

    

}
