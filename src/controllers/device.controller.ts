import {Request,Response,NextFunction} from 'express';
import { changeDeviceDetails, getAllDevices, addNewDevice, deleteDevice } from '../services/device.services';
import { Device } from '../utils/types';
import { catchAsync } from '../utils/catchAsync';

// todo: handle prisma crud errors

export const getDevices = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
   
        const result =await getAllDevices();
        if (result === null) return res.status(404).json({status: 404, message: 'No devices found' });
        
        return res.status(200).json({ message: 'Successful Devices retrieval', data : result });
})
export const addDevices = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
        const {scenarioId,name, type,ipAddress,pingRate,latency,trafficLoad}: Device= req.body
        const result = await addNewDevice({scenarioId:scenarioId,name:name,type:type,ipAddress:ipAddress,pingRate:pingRate,latency:latency,trafficLoad:trafficLoad});
        
        return res.status(201).json({ message: 'Successfully Created Device', data : result });
})

export const editDevice = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
        const id = parseInt(req.params.id);
        const {name, type,ipAddress,pingRate,latency,trafficLoad,scenarioId, status}: Device= req.body
        const result =await changeDeviceDetails({id,name,type,ipAddress,pingRate,latency,trafficLoad,scenarioId,status});
        if (result === null) return res.status(404).json({status: 404, message: 'No devices found' });
        
        return res.status(200).json({ message: 'Successfully Changed Device Details', data : result });
        


})

export const removeDevice = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
        const id = parseInt(req.params.id);
        const result =await deleteDevice({id:id});
        if (result === null) return res.status(404).json({status: 404, message: 'No devices found' });

        return res.status(204).json({ message: 'Successful Device Removal', data : result });     
})