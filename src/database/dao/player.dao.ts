import { Database } from '@database/index';
import { inject, injectable } from 'inversify';
import { ContainerValues } from '@interfaces/IContainers';
import { playerQuery } from '@libraries/query/player.query';
import { IPlayer } from '@interface/IPlayer';

@injectable()
export class PlayerDao {
    private DataBase: Database;

    constructor(@inject(ContainerValues.DATABASE) dataBase: Database) {
        this.DataBase = dataBase;
    }

    public createPlayer = async (data: IPlayer) => {
        const result: Array<any> = await this.DataBase.query(playerQuery.createPlayer, [data]);
        return result;
    }

    public updatePlayer = async (player: IPlayer) =>{
        try {
            const result: Array<any> = await this.DataBase.query(playerQuery.updatePlayer,[player])
            return result
        } catch (error) {
            return []
        }
    } 
    public getNameByDocId = async (id_documento:string)=>{
        let connection;
        console.log(playerQuery.getPlayerByDocId,[id_documento]);
        const result = await this.DataBase.query('select * from productos p where p.codigo = ?',[1]);
        return result
    } 

    public getPlayerList = async () =>{
        const result = await this.DataBase.query(playerQuery.getPlayerList)
        return result
    }
}
