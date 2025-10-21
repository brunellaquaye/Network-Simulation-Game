import {Request,Response,NextFunction} from 'express';
import { getAllScenarios , getSpecificScenarios, addNewScenario, changeScenarioDetails, deleteScenario,  } from '../services/scenario.services';
import { Scenario } from '../generated/prisma';
import { catchAsync } from '../utils/catchAsync';
import createHttpError from 'http-errors';


export const getUserScenarios = catchAsync(async(req:Request, res:Response) =>  {
 
            const Userid: number = parseInt(req.params.id)
            const result =await getAllScenarios({Userid: Userid});
            if (result.length === 0)  throw new createHttpError.NotFound('No scenario found' );

            return res.status(200).json({ message: 'Successful Scenarios retrieval', data : result });

}
)
export const getOneScenario = catchAsync(async(req:Request, res:Response)  => {

            const id: number = parseInt(req.params.id)
            const result =await getSpecificScenarios({id});
            if (result === null) throw new createHttpError.NotFound('No scenario found' );

            return res.status(200).json({ message: 'Successful Scenarios retrieval', data : result });

}
)
export const createScenario = catchAsync(async(req:Request, res:Response)  => {
 
        const userId =  parseInt(req.params.id);
        const {name, timeLimit}= req.body
        let difficulty = req.body.difficulty
        const result = await addNewScenario({ name, difficulty, timeLimit, userId});
        
        return res.status(201).json({ message: 'Successfully Created Scenario', data : result });


})

// we can edit scenarios but the user cannot be changed
export const editScenario = catchAsync(async(req:Request, res:Response)  => {
 
        const id = parseInt(req.params.id);
        const {name, timeLimit, difficulty}: Scenario= req.body
        const result =await changeScenarioDetails({id, name, timeLimit,difficulty});
        if (result === null) throw new createHttpError.NotFound('No scenario found' );
        
        return res.status(200).json({ message: 'Successfully Changed Scenario Details', data : result });
        

})

export const removeScenario = catchAsync(async(req:Request, res:Response)  => {
   
        const id = parseInt(req.params.id);
        const result =await deleteScenario({id});
        if (result === null) throw new createHttpError.NotFound('No scenario found' );
        
        return res.status(202).json({ message: 'Successful Scenario Removal', data : result });

})