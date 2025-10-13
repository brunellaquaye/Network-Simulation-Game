import express from 'express';
import { getDevices,addDevices, renameDevice, removeDevice} from '../controllers/device.controller';
const router = express.Router();

// Example route for devices
router.route('/')
.get(getDevices)
.post(addDevices)

router.route('/:id')
.patch(renameDevice)
.delete(removeDevice)



export default router;