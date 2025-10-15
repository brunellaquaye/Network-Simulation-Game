import {Request,Response} from 'express';
import { changeDeviceDetails, getAllDevices, addNewDevice, deleteDevice } from '../services/device.services';



export async function getDevices(req:Request, res:Response, next:Function) {
     try {
        const result =await getAllDevices();
        if (result == null) return res.status(404).json({status: 404, message: 'No devices found' });
        
        return res.status(200).json({ message: 'Successful Devices retrieval', data : result });
        
    } catch (error) {
        next(error);
        
    }

}

export async function addDevices(req:Request, res:Response, next:Function) {
     try {
        
        const {scenarioId,name, type}: {name: string, type: string, scenarioId: number} = req.body
        const result = await addNewDevice({scenarioId:scenarioId,name:name,type:type});
        
        return res.status(201).json({ message: 'Successfully Created Device', data : result });
        
    } catch (error) {
        next(error);
        
    }

}

// todo: add more parameters to the request body
export async function renameDevice(req:Request, res:Response, next:Function) {
     try {
        const id = parseInt(req.params.id);
        const name: string = req.body.name
        const result =await changeDeviceDetails({id:id, name:name});
        if (result == null) return res.status(404).json({status: 404, message: 'No devices found' });
        
        return res.status(200).json({ message: 'Successfully Renamed Device', data : result });
        
    } catch (error) {
        next(error);
        
    }

}

export async function removeDevice(req:Request, res:Response, next:Function) {
     try {
        const id = parseInt(req.params.id);
        const result =await deleteDevice({id:id});
        if (result == null) return res.status(404).json({status: 404, message: 'No devices found' });
        
        return res.status(204).json({ message: 'Successful Device Removal', data : result });
        
    } catch (error) {
        next(error);
        
    }

}