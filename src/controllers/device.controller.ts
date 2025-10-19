import {Request,Response,NextFunction} from 'express';
import { changeDeviceDetails, getAllDevices, addNewDevice, deleteDevice } from '../services/device.services';
import { Device } from '../utils/types';

// todo: handle prisma crud errors

export async function getDevices(req:Request, res:Response, next:NextFunction) {
     try {
        const result =await getAllDevices();
        if (result === null) return res.status(404).json({status: 404, message: 'No devices found' });
        
        return res.status(200).json({ message: 'Successful Devices retrieval', data : result });
        
    } catch (error) {
        next(error);
        
    }

}

export async function addDevices(req:Request, res:Response, next:NextFunction) {
     try {
        
        const {scenarioId,name, type,ipAddress,pingRate,latency,trafficLoad}: Device= req.body
        const result = await addNewDevice({scenarioId:scenarioId,name:name,type:type,ipAddress:ipAddress,pingRate:pingRate,latency:latency,trafficLoad:trafficLoad});
        
        return res.status(201).json({ message: 'Successfully Created Device', data : result });
        
    } catch (error) {
        next(error);
        
    }

}


export async function editDevice(req:Request, res:Response, next:NextFunction) {
     try {
        const id = parseInt(req.params.id);
        const {name, type,ipAddress,pingRate,latency,trafficLoad,scenarioId}: Device= req.body
        const result =await changeDeviceDetails({id:id, name:name, type:type,ipAddress:ipAddress,pingRate:pingRate,latency:latency,trafficLoad:trafficLoad,scenarioId:scenarioId});
        if (result === null) return res.status(404).json({status: 404, message: 'No devices found' });
        
        return res.status(200).json({ message: 'Successfully Changed Device Details', data : result });
        
    } catch (error) {
        next(error);
        
    }

}

export async function removeDevice(req:Request, res:Response, next:NextFunction) {
     try {
        const id = parseInt(req.params.id);
        const result =await deleteDevice({id:id});
        if (result === null) return res.status(404).json({status: 404, message: 'No devices found' });
        
        return res.status(204).json({ message: 'Successful Device Removal', data : result });
        
    } catch (error) {
        next(error);
        
    }

}