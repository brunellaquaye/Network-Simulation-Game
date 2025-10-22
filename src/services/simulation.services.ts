import { simulateDevice } from "../utils/simulator";
import { changeDeviceDetails } from "./device.services";
import { Device, Logs, Scenario, Status } from "../utils/types";
import { getSpecificScenarios } from "./scenario.services";
import { createDeviceLog } from "./logs.services";

export async function getScenario({id: id,randomness:random}: {id: number, randomness: object}): Promise<Scenario | null> {
    let oldStatus: Status;
    const scenario = await getSpecificScenarios({id, addDevices: 'true'}) as Scenario & { devices: Device[]}
     if (!scenario || !scenario.devices || scenario.devices.length === 0) return null;
    for (let device of scenario.devices){
        oldStatus = device.status as Status
        // console.log(`initial device ${JSON.stringify(device)}`)
        let new_state = simulateDevice({device: { ...device, status: device.status as Status },randomness:random})
        // console.log(`New device state ${JSON.stringify(new_state)}`)
        
        await changeDeviceDetails(new_state)
        if (oldStatus !== new_state.status) {

            let itFailed = new_state.status == Status.offline 
            const log: Logs = {
                deviceId: new_state.id,
                eventType: itFailed ? 'failure' :'recovery',
                message: itFailed ?  `Device ${device.name} went offline.` :  `Device ${device.name} is back online`
            }
             await createDeviceLog(log);
            }
    }
    return await getSpecificScenarios({id: id, addDevices: 'true'});
} 