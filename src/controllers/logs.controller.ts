import {Request,Response} from 'express';
import { catchAsync } from '../utils/catchAsync';
import createHttpError from 'http-errors';
import { createDeviceLog, exposeAllLogs, getDeviceLogs } from '../services/logs.services';

// Users don't create Logs, events do
// export const CreateLog =  catchAsync(async (req:Request, res:Response) => {
//         const result = await createDeviceLog(req.body);
//         return res.status(201).json({ message: 'Successfully Created log', data : result });
// })


export const LogsOfDevice = catchAsync(async (req:Request, res:Response) => {
    const result = getDeviceLogs(parseInt(req.params.id))
    if(result === null) throw createHttpError.NotFound('Device not found');

    return res.status(200).json({message: 'Successfully retrieved device logs'})

})

export const AllLogs = catchAsync(async (req:Request, res:Response) => {
    const superAdminId= parseInt(req.params.superAdminId)
    const result = exposeAllLogs(superAdminId)
    if(result === null) throw createHttpError.NotFound('SuperAdmin Access Only');

    return res.status(200).json({message: 'Successfully retrieved all logs'})
})
