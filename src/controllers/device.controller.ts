import {Request,Response} from 'express';
import { changeDeviceDetails, getAllDevices, addNewDevice, deleteDevice } from '../services/device.services';
import { catchAsync } from '../utils/catchAsync';
import createHttpError from 'http-errors';
import { getDeviceLogs } from '../services/logs.services';

export const getDevices = catchAsync(async (req:Request, res:Response) => {
   
        const result = await getAllDevices();
        if (result === null) throw new createHttpError.NotFound('No devices found');
        
        return res.status(200).json({ message: 'Successful Devices retrieval', data : result });
})

export const getDevicesWithLogs = catchAsync(async (req:Request, res:Response) => {
        
        const id = parseInt(req.params.id)
        const result = await getDeviceLogs(id);
        if (result === null) throw new createHttpError.NotFound('No devices found');
        
        return res.status(200).json({ message: 'Successful Devices retrieval', data : result });
})

export const addDevices = catchAsync(async (req:Request, res:Response) => {
        const result = await addNewDevice(req.body);
        return res.status(201).json({ message: 'Successfully Created Device', data : result });
})

export const editDevice = catchAsync(async (req:Request, res:Response) => {
        const id = parseInt(req.params.id);
        const result = await changeDeviceDetails({id,...req.body});
        if (result === null) throw new createHttpError.NotFound('No devices found');
        
        return res.status(200).json({ message: 'Successfully Changed Device Details', data : result });
        


})
// todo: device removal should also remove logs
export const removeDevice = catchAsync(async (req:Request, res:Response) => {
        const id = parseInt(req.params.id);
        const result = await deleteDevice({id});
        if (result === null) throw createHttpError.NotFound('Device not found')

        return res.status(204).json({ message: 'Successful Device Removal', data : result });     
})