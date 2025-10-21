
jest.mock('../../config/db', () => {
  const scenarioFns = {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn()
  };
  const prismaObj = { scenario: scenarioFns };

  return {
    __esModule: true,
    default: prismaObj, 
    prisma: prismaObj, 
  };
});

import prisma from "../../config/db";
import { difficulty } from "../../generated/prisma";
import { addNewScenario, changeScenarioDetails, deleteScenario, getAllScenarios } from "../../services/scenario.services";
import { scenario } from "../mockData";


describe('All Scenario Services', ()=> {
  beforeEach(()=>jest.clearAllMocks())
  describe('Getting all Scenarios', ()=>{
    it('should return all available scenarios',async()=>{
      (prisma.scenario.findMany as jest.Mock).mockResolvedValue(scenario[1])
      const result = await getAllScenarios({Userid: scenario[1].userId})
      expect(result).toBe(scenario)
      expect(prisma.scenario.findMany).toHaveBeenCalledTimes(1);
    })
  })

  describe('Getting Specific Scenario', ()=>{
    it('should return specific scenario with devices', async()=>{
      (prisma.scenario.findUnique as jest.Mock).mockResolvedValue(scenario[0])
      const result = await getAllScenarios({Userid: scenario[0].userId})
      expect(result).toBe(scenario[0])
      expect(prisma.scenario.findUnique).toHaveBeenCalledTimes(1);
    })
  })

  describe('Creating a scenario', ()=>{
    it('should return a newly created scenario', async()=>{
      let created =  scenario[1];
      (prisma.scenario.create as jest.Mock).mockResolvedValue(scenario[1]);
      const result = await addNewScenario({userId: created.userId, name: created.name, difficulty: created.difficulty as difficulty, timeLimit: created.timeLimit});
      expect(result).toBe(created)
      expect(prisma.scenario.create).toHaveBeenCalledTimes(1);
  });

});
  describe('Changing details of scenario', ()=>{
    it('should return changed details of scenario', async()=>{
      let edited =  scenario[1];
      (prisma.scenario.update as jest.Mock).mockResolvedValue(scenario[1])
      const result = await changeScenarioDetails({id:edited.id, name: edited.name, difficulty: edited.difficulty as difficulty, timeLimit: edited.timeLimit})
      expect(result).toBe(scenario[1])
      expect(prisma.scenario.update).toHaveBeenCalledTimes(1);
    })
  })
    describe('delete a particular scenario', () => {
    it('should delete and return the deleted scenario and call prisma.delete with correct where', async () => {
      (prisma.scenario.findFirst as jest.Mock).mockResolvedValue(scenario[1]);
      (prisma.scenario.delete as jest.Mock).mockResolvedValue(scenario[1]);

      const result = await deleteScenario({ id: 6 });
      expect(result).toEqual(scenario[1]);

      expect(prisma.scenario.delete).toHaveBeenCalledTimes(1);
      expect(prisma.scenario.delete).toHaveBeenCalledWith({ where: { id: 6 } });
    });

  });
})