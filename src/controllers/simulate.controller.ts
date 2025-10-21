import { Request, Response } from "express";
import { getScenario } from "../services/simulation.services";
import { io } from "../server";
import { catchAsync } from "../utils/catchAsync";
import createHttpError from "http-errors";

export const simulateDeviceState = catchAsync(async(req: Request,res: Response) => {
 
        const id = parseInt(req.params.id);
        const result = await getScenario({id:id,randomness:req.body})
        if (result === null) throw new createHttpError.NotFound('Simulation has no devices');
        
        io.on("deviceUpdate",()=>{
          io.emit('updated', result)
        });
    
        res.status(200).json({ status: "Simulating updates..." });
})



