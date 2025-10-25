import {Request,Response} from 'express';
import { catchAsync } from '../utils/catchAsync';
import createHttpError from 'http-errors';
import { clearAllLogs, exposeAllLogs, getScenarioLogs, getUserScenarioSessionLogs } from '../services/logs.services';


export const AllLogs = catchAsync(async (req:Request, res:Response) => {
    const superAdminId= parseInt(req.params.id)
    const result = exposeAllLogs(superAdminId)
    if(result === null) throw createHttpError.NotFound('SuperAdmin Access Only');

    return res.status(200).json({message: 'Successfully retrieved all logs'})
})

export const ScenarioLogs = catchAsync(async (req:Request, res:Response) => {
    const scenarioId= parseInt(req.params.id)
    const result = getScenarioLogs(scenarioId)
    if(result === null) throw createHttpError.NotFound('No logs for selected scenario');

    return res.status(200).json({message: 'Successfully retrieved all logs'})
})

export const getLogsforUserScenarioSession = catchAsync(async (req:Request, res:Response) => {
    const userId= parseInt(req.params.id)
    const scenarioId = parseInt(req.body.scenarioId)
    const result = getUserScenarioSessionLogs(scenarioId, userId)
    if(result === null) throw createHttpError.NotFound('No logs for selected scenario');

    return res.status(200).json({message: 'Successfully retrieved all logs'})
})

export const superLogsClear  = catchAsync(async (req:Request, res:Response) => {
    const superAdminId= parseInt(req.params.id)
    const result = clearAllLogs(superAdminId)
    if(result === null) throw createHttpError.NotFound('SuperAdmin Access Only');

    return res.status(200).json({message: 'Successfully retrieved all logs'})
})