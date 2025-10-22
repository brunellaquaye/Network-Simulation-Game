import express from 'express';
import { scenarioValidator } from '../middleware/validator';
import { getUserScenarios, getOneScenario, createScenario, editScenario, removeScenario } from '../controllers/scenario.controller';
import { simulateDeviceState } from '../controllers/simulate.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorizeRole';


const router = express.Router();

router.use(authMiddleware, authorizeRoles("admin","superadmin"))

// GET /api/users/:id/scenarios - get all scenarios for a user
router.route('/user/:id/scenarios')
.get(getUserScenarios)
.post(scenarioValidator,createScenario) 

// CRUD /api/scenario/:id - get, update, delete a scenario by id
router.route('/scenario/:id')
.get(getOneScenario)
.patch(scenarioValidator,editScenario)
.delete(removeScenario)

router.post('/scenario/:id/simulate',simulateDeviceState)

export default router;