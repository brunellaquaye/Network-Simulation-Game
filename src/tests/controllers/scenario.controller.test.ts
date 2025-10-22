

jest.mock('../../services/scenario.services', ()=>({
    addNewScenario: jest.fn(),
    changeScenarioDetails: jest.fn(),
    deleteScenario: jest.fn(),
    getAllScenarios: jest.fn(),
    getSpecificScenarios: jest.fn()

}))

import { createScenario, editScenario, getOneScenario, getUserScenarios, removeScenario } from "../../controllers/scenario.controller";
import { addNewScenario, changeScenarioDetails, deleteScenario, getAllScenarios, getSpecificScenarios } from "../../services/scenario.services";
import createHttpError from 'http-errors';
import { scenario } from "../mockData";

const next = jest.fn();

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = (data: any) => {
  return data;
}



describe('Testing all scenario Controllers', ()=>{
    beforeEach(()=>jest.clearAllMocks())
    describe('getting Scenarios', ()=>{
        const req = mockRequest({params: {id: 2}});
        const res = mockResponse();
        it('should return all scenarios', async()=>{

            (getAllScenarios as jest.Mock).mockResolvedValue(scenario);
            await getUserScenarios(req,res,next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Successful Scenarios retrieval', data : scenario });
        })
        it('should hit a notfound error', async()=>{
            (getAllScenarios as jest.Mock).mockResolvedValue([]);
            try {
                await getUserScenarios(req,res,next);
            } catch (error: any) {
                expect(error).toBeInstanceOf(createHttpError.NotFound)
                expect(error.status).toBe(200)
                expect(error.message).toBe('No scenario found')
            }
        })
    });

    describe('getting one scenario', ()=>{
        const req = mockRequest({params: {id: 1}});
        const res = mockResponse();
        it('should return a specific scenario', async()=>{

        (getSpecificScenarios as jest.Mock).mockResolvedValue(scenario[0])
        await getOneScenario(req, res,next)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ message: 'Successful Scenarios retrieval', data : scenario[0] });
        })

          it('should hit a notfound error', async()=>{
            (getSpecificScenarios as jest.Mock).mockResolvedValue(null);
            try {
                await getOneScenario(req,res,next);
            } catch (error: any) {
                expect(error).toBeInstanceOf(createHttpError.NotFound)
                expect(error.status).toBe(404)
                expect(error.message).toBe('No scenario found')
            }
        })
    });

    describe('adding a new scenario',()=>{
        const {userId, name, timeLimit, difficulty} = scenario[1];
        const req = mockRequest({body: { name, timeLimit, difficulty}, params: {id: 6}});
        const res = mockResponse();
        it('should create a new scenerio', async()=>{

        (addNewScenario as jest.Mock).mockResolvedValue(scenario[1])
        await createScenario(req, res,next)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ message: 'Successfully Created Scenario', data : scenario[1] });
        })

     })

    describe('Edit a scenerios details', ()=>{
        const req= mockRequest({params: {id: 1}, body: {name: 'Updated Device A' }});
        const res= mockResponse();
            it('should change the details of a scenario', async()=>{

            (changeScenarioDetails as jest.Mock).mockResolvedValue(scenario[0]);
            await editScenario(req,res,next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Successfully Changed Scenario Details', data : scenario[0] });
        }); 
        it('should hit a notfound error', async()=>{
            (changeScenarioDetails as jest.Mock).mockResolvedValue(null);
            try {
                await editScenario(req,res,next);
            } catch (error: any) {
                expect(error).toBeInstanceOf(createHttpError.NotFound)
                expect(error.status).toBe(404)
                expect(error.message).toBe('No scenario found')
            }
        })
    })

    describe('Completely remove a scenerios', ()=>{
        const req= mockRequest({params: {id: 1}});
        const res= mockResponse();
        it('should delete a particular scenario', async()=>{
            
            (deleteScenario as jest.Mock).mockResolvedValue({ id: 1 });
            await removeScenario(req,res,next);

            expect(deleteScenario).toHaveBeenCalledWith({ id: 1 });
        }
        );
         it('should hit a notfound error', async()=>{
            (deleteScenario as jest.Mock).mockResolvedValue(null);
            try {
                await removeScenario(req,res,next);
            } catch (error: any) {
                expect(error).toBeInstanceOf(createHttpError.NotFound)
                expect(error.status).toBe(404)
                expect(error.message).toBe('No scenario found')
            }
        })
    })
})

