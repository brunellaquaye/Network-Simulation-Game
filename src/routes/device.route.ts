import express from 'express';
import { getDevices,addDevices, editDevice, removeDevice} from '../controllers/device.controller';
import { deviceValidator } from '../middleware/validator';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorizeRole';


const router = express.Router();

router.use(authMiddleware, authorizeRoles("admin","superadmin"))


router.route('/')
.get(getDevices)
.post(deviceValidator,addDevices)

router.route('/:id')
.patch(deviceValidator,editDevice)
.delete(removeDevice)



export default router;