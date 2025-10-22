import {Request,Response} from 'express';
import { getAllUserScenarios , getSpecificScenarios, addNewScenario, changeScenarioDetails, deleteScenario, getAllScenarios } from '../services/scenario.services';
import { Scenario } from '../generated/prisma';
import { catchAsync } from '../utils/catchAsync';
import createHttpError from 'http-errors';


export const getUserScenarios = catchAsync(async(req:Request, res:Response) =>  {
            const addDevices = req.query.addDevices as string | undefined;
            const Userid = parseInt(req.params.id);
            const result = await getAllUserScenarios({ Userid, addDevices });
            if (result.length === 0)  throw new createHttpError.NotFound('No scenario found' );

            return res.status(200).json({ message: 'Successful Scenarios retrieval', data : result });

})
export const getAllScenario = catchAsync(async(req:Request, res:Response )=>{
                const result = await getAllScenarios()
                if (result.length === 0)  throw new createHttpError.NotFound('No scenario found' );

            return res.status(200).json({ message: 'Successful Scenarios retrieval', data : result });
        })
export const getOneScenario = catchAsync(async(req:Request, res:Response)  => {
             const addDevices = req.query.addDevices as string | undefined;
            const id: number = parseInt(req.params.id)
            const result =await getSpecificScenarios({id, addDevices});
            if (result === null) throw new createHttpError.NotFound('No scenario found');

            return res.status(200).json({ message: 'Successful Scenarios retrieval', data : result });

}
)
export const createScenario = catchAsync(async(req:Request, res:Response)  => {
 
        const userId =  parseInt(req.params.id);
        const {name, timeLimit, difficulty}= req.body
        const result = await addNewScenario({ name, difficulty, timeLimit, userId});
        if(result === null) throw createHttpError.NotFound('This User does not exist');
        
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
// todo: scenario removal should also remove device which will then remove logs
export const removeScenario = catchAsync(async(req:Request, res:Response)  => {
   
        const id = parseInt(req.params.id);
        const result =await deleteScenario({id});
        if (result === null) throw new createHttpError.NotFound('No scenario found' );
        
        return res.status(202).json({ message: 'Successful Scenario Removal', data : result });

})