import { PlayerDao } from "@database/dao/player.dao";
import { ContainerValues } from "@interface/IContainers";
import { IPlayer } from "@interface/IPlayer";
import playerErrors from "@libraries/errors/player.erros";
import logger from "@util/logger";
import { inject, injectable } from "inversify";

@injectable()
export class PlayerService {
    private playerDao: PlayerDao;

    constructor(@inject(ContainerValues.PLAYER_DAO) playerDao: PlayerDao) {
        this.playerDao = playerDao;
    }

    public createPlayer = async (data: IPlayer) => {
        try {
            const response = await this.playerDao.createPlayer(data)
            return response
        } catch (error) {
            logger.error('Error in service createPlayer', error)
            throw error
        }
    }

    public updatePlayer = async (data: IPlayer) => {
        try {
            const response = await this.playerDao.updatePlayer(data)
            return response
        } catch (error) {
            logger.error('ERROR PLAYER SERVICE', error)
            throw error
        }
    }
    public getNamePlayerBydocId = async (docId: string) =>{
        try {
            const response = await this.playerDao.getNameByDocId(docId)
            console.log('REPONSEE',response)

            if(response[0].length < 0) throw playerErrors.playerNotFound;

            return response
        } catch (error) {
            logger.error('ERROR PLAYER SERVICE', error)
            throw error
        }
    }

    public getPlayerList = async () =>{
        try {
            const response = await this.playerDao.getPlayerList()
            return { Data: response }
        } catch (error) {
            logger.error('ERROR PLAYER SERVICE', error)
            throw error
        }
    }


}
