import { NextFunction, Request, Response } from "express";
import { getScenario } from "../services/simulation.services";
import _ from 'lodash';
import { io } from "../server";

export async function simulateDeviceState(req: Request,res: Response, next: NextFunction){
    try {
        const id = parseInt(req.params.id);
        const result = getScenario({id:id,randomness:req.body})
        if (result === null) return res.status(404).json({message: 'Simulation has no devices'});
        
        io.on("deviceUpdate",()=>{
          io.emit('updated', result)
        });
    
        res.json({ status: "Simulating updates..." });
    

    
    } catch (error) {
        next(error)
    }

}



