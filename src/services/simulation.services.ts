import prisma from "../config/db";
import { simulateDevice } from "../utils/simulator";
import { changeDeviceDetails } from "./device.services";
import { Status } from "../utils/types";
import { getSpecificScenarios } from "./scenario.services";
import _ from 'lodash';

export async function getScenario({id: id,randomness:random}: {id: number, randomness: object}) {
    const scenario = await getSpecificScenarios({id: id})
    if (!scenario) return null;
    if (scenario.devices.length === 0) return null;
    for (let device of scenario.devices){
        // console.log(`initial device ${JSON.stringify(device)}`)
        let new_state = simulateDevice({device: { ...device, status: device.status as Status },randomness:random})
        // console.log(`New device state ${JSON.stringify(new_state)}`)
        await changeDeviceDetails(new_state)
    }
    return await getSpecificScenarios({id: id});
} 