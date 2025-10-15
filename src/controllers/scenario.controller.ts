import {Request,Response} from 'express';
import { getAllScenarios } from '../services/scenario.services';


export async function getUserScenarios(req:Request, res:Response, next:Function) {
    try {
            const id: number = parseInt(req.params.id)
            const result =await getAllScenarios({id: id});
            if (result == null) return res.status(404).json({status: 404, message: 'No devices found' });
    } catch (error) {
        next(error)
    }
}

