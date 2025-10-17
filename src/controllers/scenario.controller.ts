import {Request,Response} from 'express';
import { getAllScenarios , getSpecificScenarios, addNewScenario, changeScenarioDetails, deleteScenario,  } from '../services/scenario.services';
import { Scenario } from '../generated/prisma';


export async function getUserScenarios(req:Request, res:Response, next:Function) {
    try {
            const Userid: number = parseInt(req.params.id)
            const result =await getAllScenarios({Userid: Userid});
            if (result === null) return res.status(404).json({status: 404, message: 'No scenario found' });

            return res.status(200).json({ message: 'Successful Scenarios retrieval', data : result });

    } catch (error) {
        next(error);
    }
}

export async function getOneScenario(req:Request, res:Response, next:Function) {
    try {
            const id: number = parseInt(req.params.id)
            const result =await getSpecificScenarios({id: id});
            if (result === null) return res.status(404).json({status: 404, message: 'No scenario found' });

            return res.status(200).json({ message: 'Successful Scenarios retrieval', data : result });
    } catch (error) {
        next(error);
    }

}

export async function createScenario(req:Request, res:Response, next:Function) {
     try {
        const userId =  parseInt(req.params.id);
        const {name, timeLimit}: Scenario= req.body
        let difficulty = req.body.difficulty as "easy" | "medium" | "hard"
        const result = await addNewScenario({ name:name, difficulty:difficulty,timeLimit:timeLimit,userId:userId});
        
        return res.status(201).json({ message: 'Successfully Created Device', data : result });
        
    } catch (error) {
        next(error);   
    }

}

// we can edit scenarios but the user cannot be changed
export async function editScenario(req:Request, res:Response, next:Function) {
     try {
        const id = parseInt(req.params.id);
        const {name, timeLimit, userId}: Scenario= req.body
        let difficulty = req.body.difficulty as "easy" | "medium" | "hard"
        const result =await changeScenarioDetails({id:id, name:name, difficulty:difficulty,timeLimit:timeLimit, userId: userId});
        if (result == null) return res.status(404).json({status: 404, message: 'No Scenario found' });
        
        return res.status(200).json({ message: 'Successfully Changed Device Details', data : result });
        
    } catch (error) {
        next(error);   
    }

}

export async function removeScenario(req:Request, res:Response, next:Function) {
     try {
        const id = parseInt(req.params.id);
        const result =await deleteScenario({id:id});
        if (result == null) return res.status(404).json({status: 404, message: 'No scenario found' });
        
        return res.status(204).json({ message: 'Successful Device Removal', data : result });
        
    } catch (error) {
        next(error); 
    }
}