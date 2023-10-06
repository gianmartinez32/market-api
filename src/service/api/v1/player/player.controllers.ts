import { ContainerValues } from "@interface/IContainers";
import { PlayerService } from "./player.service";
import { inject, injectable } from "inversify";
import { NextFunction, Request, RequestHandler, Response } from "express";
import logger from "@util/logger";
import { IPlayer } from "@interface/IPlayer";
import { number } from "joi";



@injectable()
export class PlayerController {
    private playerService: PlayerService;
    constructor(@inject(ContainerValues.PLAYER_SERVICE) playerService: PlayerService) {
        this.playerService = playerService;
    }

    public createPlayer: RequestHandler = async (req: Request, res: Response) => {

        try {
            const { query } = req;

            const body: IPlayer = {
                id_documento: String(query.id),
                puntuacion: Number(query.puntuacion) || 0,
                nombre: String(query.nombre)
            }
            const response = await this.playerService.createPlayer(body)
            console.log('Response', response)
            if (response[0].insertar_en_player === '-1') {
                res.status(409).json({ message: 'Player already exists' })
            } else {
                res.status(201).json({ message: 'Player created' })
            }
        } catch (error) {
            logger.error('Error creating player', error)
            res.status(500).json({ message: 'Error creating player' })
        }

    }
    public updatePlayer: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { query } = req

            const body = {
                id_documento: String(query.id),
                puntuacion: Number(query.puntuacion)
            }
            const response = await this.playerService.updatePlayer(body)
            if (response[0].actualizar_posicion_puntuacion === '-1') {
                res.status(400).json({ message: 'Player not found' })
            } else {
                res.status(200).json({ id_actualizado: response[0].actualizar_posicion_puntuacion })

            }

        } catch (error) {
            logger.error('Error updating player', error)
            res.status(500).json({ error: 'Error updating player' })
        }
    }
    public getPlayerByDocument: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query as unknown as { id: number };

            const response = await this.playerService.getNamePlayerBydocId(String(id))

            res.status(200).json({ ...response[0] })

        } catch (error) {
            logger.error('Error getting player', error)
            return next(error);
        }
    }

    public getPlayerList: RequestHandler = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.playerService.getPlayerList()
            res.status(200).json(response)
        } catch (error) {
            return next(error);
        }
    }
}