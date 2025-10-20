import {Request,Response} from 'express';
import { changeDeviceDetails, getAllDevices, addNewDevice, deleteDevice } from '../services/device.services';
import { Device } from '../utils/types';
import { catchAsync } from '../utils/catchAsync';
import createHttpError from 'http-errors';

export const getDevices = catchAsync(async (req:Request, res:Response) => {
   
        const result =await getAllDevices();
        if (result === null) throw new createHttpError.NotFound('No devices found');
        
        return res.status(200).json({ message: 'Successful Devices retrieval', data : result });
})

export const addDevices = catchAsync(async (req:Request, res:Response) => {
        const result = await addNewDevice(req.body);
        
        return res.status(201).json({ message: 'Successfully Created Device', data : result });
})

export const editDevice = catchAsync(async (req:Request, res:Response) => {
        const id = parseInt(req.params.id);
        const {name, type,ipAddress,pingRate,latency,trafficLoad,scenarioId, status}: Device= req.body
        const result =await changeDeviceDetails({id,name,type,ipAddress,pingRate,latency,trafficLoad,scenarioId,status});
        if (result === null) throw new createHttpError.NotFound('No devices found');
        
        return res.status(200).json({ message: 'Successfully Changed Device Details', data : result });
        


})

export const removeDevice = catchAsync(async (req:Request, res:Response) => {
        const id = parseInt(req.params.id);
        const result =await deleteDevice({id:id});
        if (result === null) throw new createHttpError.NotFound('Device not found')

        return res.status(204).json({ message: 'Successful Device Removal', data : result });     
})