const devices = [
    {
      "id": 1,
      "name": "Updated Device A",
      "type": "router",
      "pingRate": null,
      "latency": null,
      "trafficLoad": null,
      "status": "online",
      "lastUpdated": "2025-10-13T17:16:36.040Z",
      "scenarioId": 1
    },
    {
      "id": 3,
      "name": "Device A",
      "type": "router",
      "pingRate": null,
      "latency": null,
      "trafficLoad": null,
      "status": "online",
      "lastUpdated": "2025-10-13T17:24:33.186Z",
      "scenarioId": 1
    },
    {
      "id": 4,
      "name": "Updated Device A",
      "type": "router",
      "pingRate": null,
      "latency": null,
      "trafficLoad": null,
      "status": "online",
      "lastUpdated": "2025-10-13T17:59:25.590Z",
      "scenarioId": 1
    }
  ];

jest.mock('../../services/device.services',()=>({
    getAllDevices: jest.fn(),
    addNewDevice: jest.fn(),
    changeDeviceDetails: jest.fn(),
    deleteDevice: jest.fn(),  
}))

const { getAllDevices, addNewDevice, changeDeviceDetails, deleteDevice } = require('../../services/device.services');
const { getDevices, addDevices, renameDevice, removeDevice} = require('../../controllers/device.controller');



const next = jest.fn();

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Device Controllers', () => {
     beforeEach(() => {
         jest.clearAllMocks();
     });

    describe('getAllDevices', () => {
        
        it('should return all devices', async () => {   
            req= {};
            res= mockResponse();

            getAllDevices.mockResolvedValue(devices);
            const result = await getDevices(req,res,next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Successful Devices retrieval', data : devices });
        });
        it('should return 404 if no devices found', async () => {
            req= {};
            res= mockResponse();

            getAllDevices.mockResolvedValue(null);
            await getDevices(req, res, next);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({status: 404, message: 'No devices found' });
        }
        );
        it('should return error',async()=>{
            const res = mockResponse()
            const req = {query: {}}

            getAllDevices.mockRejectedValue(new Error('failed'))
            await getDevices(req,res,next)

            expect(next).toHaveBeenCalled()

        })
    });
    describe('addNewDevice', () => {

        it('should create and return a new device', async () => {
            req= {body: {scenarioId: 1, name: 'Device A', type: 'router' }};
            res= mockResponse();

            addNewDevice.mockResolvedValue(devices[0]);
            const result = await addDevices(req,res,next);
            
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Successfully Created Device', data : devices[0] });
        });  

         it('should return error',async()=>{
            const res = mockResponse()
            const req = {query: {}}

            addNewDevice.mockRejectedValue(new Error('failed'))
            await addDevices(req,res,next)

            expect(next).toHaveBeenCalled()

        })
    });
    describe('changeDeviceDetails', () => {
        it('should update and return the device details', async () => {
            req= {params: {id: 1}, body: {name: 'Updated Device A' }};
            res= mockResponse();

            changeDeviceDetails.mockResolvedValue(devices[0]);
            const result = await renameDevice(req,res,next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Successfully Renamed Device', data : devices[0] });
        });  
        it('should return 404 if device to update not found', async () => {
            req= {params: {id: 999}, body: {name: 'Updated Device A' }};
            res= mockResponse();

            changeDeviceDetails.mockResolvedValue(null);
            await renameDevice(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({status: 404, message: 'No devices found' });
        });
        it('should return error',async()=>{
            const res = mockResponse()
            const req = {query: {}}

            changeDeviceDetails.mockRejectedValue(new Error('failed'))
            await renameDevice(req,res,next)

            expect(next).toHaveBeenCalled()

        })
    });
    describe('deleteDevice', () => {
        it('should delete and return the deleted device', async () => {
            req= {params: {id: 1}};
            res= mockResponse();
            
            deleteDevice.mockResolvedValue({ id: 1 });
            const result = await removeDevice(req,res,next);

            expect(res.status).toHaveBeenCalledWith(204);
        }
        );
        it('should return 404 if device to delete not found', async () => {
            req= {params: {id: 999}};
            res= mockResponse();

            deleteDevice.mockResolvedValue(null);

            await removeDevice(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({status: 404, message: 'No devices found' });
        });

         it('should return error',async()=>{
            const res = mockResponse()
            const req = {query: {}}

            deleteDevice.mockRejectedValue(new Error('failed'))
            await removeDevice(req,res,next)

            expect(next).toHaveBeenCalled()

        })

    });
});

