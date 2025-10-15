import express from 'express';
// import { Scenario } from '../middleware/validator';
import { getUserScenarios } from '../controllers/scenario.controller';
const router = express.Router();

router.route('/:id/scenarios')
.get(getUserScenarios)

// router.route('/:id/scenario')
// .get().patch().delete()

export default router;