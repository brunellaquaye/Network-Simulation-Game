import express from 'express';
import { scenarioValidator } from '../middleware/validator';
import { getUserScenarios, getOneScenario, createScenario, editScenario, removeScenario } from '../controllers/scenario.controller';
const router = express.Router();


// GET /api/users/:id/scenarios - get all scenarios for a user
router.route('/user/:id/scenarios')
.get(getUserScenarios)
.post(scenarioValidator,createScenario) 

// CRUD /api/scenario/:id - get, update, delete a scenario by id
router.route('/scenario/:id')
.get(getOneScenario)
.patch(scenarioValidator,editScenario)
.delete(removeScenario)

export default router;