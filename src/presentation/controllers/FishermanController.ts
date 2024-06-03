import { Request, Response } from 'express';
import { Fisherman } from '../../domain/entities/Fisherman';
import  fishermanService  from '../../application/services/FishermanService';

    async function registerFisherman(req: Request, res: Response): Promise<Response> {
        try{
            const fishermanRegister = {
                dniUser: req.body.dni,
                score: 0,
                locationId: 1,
            } as Fisherman;

            const fisherman = await fishermanService.createFisherman(fishermanRegister);
            if (fisherman) {
                return res.status(201).json(fisherman);
            } else {
                return res.status(409).json({ error: 'Fisherman already exists' });
            }

        }catch(error){
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async function updateFisherman(req: Request, res: Response): Promise<Response> {
        try {
            const { dni, score } = req.body;
            const fishermanUpdated = await fishermanService.updateFisherman(dni, score);
            if (fishermanUpdated) {
                return res.status(200).json({ message: 'Fisherman updated' });
            } else {
                return res.status(404).json({ error: 'Fisherman not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async function getFisherman(req: Request, res: Response): Promise<Response> {
        try {
            const { dni } = req.params;
            const fisherman = await fishermanService.getFisherman(dni);
            if (fisherman) {
                return res.status(200).json(fisherman);
            } else {
                return res.status(404).json({ error: 'Fisherman not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

    export default { registerFisherman, updateFisherman, getFisherman };

