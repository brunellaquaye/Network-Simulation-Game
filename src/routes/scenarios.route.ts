import express from 'express';
import { scenarioValidator } from '../middleware/validator';
import { authorizeRoles } from '../middleware/authorizeRole';
import {
  getUserScenarios,
  getOneScenario,
  createScenario,
  editScenario,
  removeScenario,
//   getAllScenario
} from '../controllers/scenario.controller';
import { simulateDeviceState } from '../controllers/simulate.controller';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();
// :large_green_circle: Player: View only their own scenarios
router.get(
  '/users/:id/scenarios',authMiddleware,
  authorizeRoles("player","admin","superadmin"),
  getUserScenarios
);
// :large_orange_circle: Admin: Create new scenarios (only for themselves)
router.post(
  '/users/:id/scenarios',
  authMiddleware,
  authorizeRoles('admin', 'superadmin'),
  scenarioValidator,
  createScenario
);
// :large_blue_circle: Everyone with valid role can GET, but edit/delete restricted
router.route('/scenario/:id')
  // View: Player can view their assigned scenario, Admin/SuperAdmin unrestricted
  .get(authMiddleware,authorizeRoles("player","admin","superadmin"), getOneScenario)
  // Update: Only Admin (their own) or SuperAdmin (any)
  .patch(authMiddleware,authorizeRoles("admin","superadmin"), scenarioValidator, editScenario)
  // Delete: Only Admin (their own) or SuperAdmin (any)
  .delete(authMiddleware,authorizeRoles("admin","superadmin"), removeScenario);
// :large_purple_circle: SuperAdmin only: View all scenarios system-wide


// router.get(
//   '/scenarios',
//   authorizeRoles('superadmin'),
// //   getAllScenario
// );

// :large_yellow_circle: Simulation trigger (Player runs simulation for their own)
router.post(
  '/scenario/:id/simulate',
  authMiddleware,
  authorizeRoles("player","admin","superadmin"),
  simulateDeviceState
);
export default router;






