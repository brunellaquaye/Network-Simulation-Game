import express from 'express';
import { scenarioValidator } from '../middleware/validator';
import { getUserScenarios } from '../controllers/scenario.controller';
const router = express.Router();

router.route('/:id/scenarios')
.get(scenarioValidator,getUserScenarios)

// router.route('/:id/scenario')
// .get().patch().delete()

export default router;