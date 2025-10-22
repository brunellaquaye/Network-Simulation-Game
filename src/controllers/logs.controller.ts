import {Request,Response} from 'express';
import { catchAsync } from '../utils/catchAsync';
import createHttpError from 'http-errors';
import { createDeviceLog, getDeviceLogs } from '../services/logs.services';

export const CreateLog =  catchAsync(async (req:Request, res:Response) => {
        const result = await createDeviceLog(req.body);
        return res.status(201).json({ message: 'Successfully Created log', data : result });
})