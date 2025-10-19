import express from 'express';
import { getDevices,addDevices, editDevice, removeDevice} from '../controllers/device.controller';
import { deviceValidator } from '../middleware/validator';
const router = express.Router();


router.route('/')
.get(deviceValidator,getDevices)
.post(deviceValidator,addDevices)

router.route('/:id')
.patch(deviceValidator,editDevice)
.delete(removeDevice)



export default router;