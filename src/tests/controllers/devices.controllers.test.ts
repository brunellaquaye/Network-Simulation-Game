import * as DeviceServices from '../../services/device.services';
import * as DeviceController from '../../controllers/device.controller';

jest.mock('../../services/device.services',()=>({
    getAllDevices: jest.fn(),
    addNewDevice: jest.fn(),
    changeDeviceDetails: jest.fn(),
    deleteDevice: jest.fn(),  
}))

const { getDevices, addDevices, editDevice, removeDevice} = DeviceController
const { getAllDevices, addNewDevice, changeDeviceDetails, deleteDevice } = DeviceServices
const { devices } = require('../mockData');
import createHttpError from 'http-errors';

// const MockedHttpErrors = createHttpError as jest.Mocked<typeof createHttpError>
const next = jest.fn();

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = (data: any) => {
  return data;
}

describe('Device Controllers', () => {
     beforeEach(() => {
         jest.clearAllMocks();
     });

    describe('getAllDevices', () => {
        
        it('should return all devices', async () => {   
            const req= mockRequest({});
            const res= mockResponse();

            (getAllDevices as jest.Mock).mockResolvedValue(devices);
            const result = await getDevices(req,res,next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Successful Devices retrieval', data : devices });
        });
        it('should return 404 if no devices found', async () => {
            const req= mockRequest({});
            const res= mockResponse();

           ( getAllDevices as jest.Mock).mockResolvedValue(null);
           try {
                await getDevices(req, res, next);
            } catch (error: any) {
                expect(error).toBeInstanceOf(createHttpError.NotFound);
                expect(error.status).toBe(404);
                expect(error.message).toBe( 'No devices found' );
                
            }
        }
        );
    });
    describe('addNewDevice', () => {

        it('should create and return a new device', async () => {
            const req= mockRequest({body: {scenarioId: 1, name: 'Device A', type: 'router' }});
            const res= mockResponse();

            (addNewDevice as jest.Mock).mockResolvedValue(devices[0]);
             await addDevices(req,res,next);
            
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Successfully Created Device', data : devices[0] });
        });  

    });
    describe('changeDeviceDetails', () => {
        it('should update and return the device details', async () => {
            const req= mockRequest({params: {id: 1}, body: {name: 'Updated Device A' }});
            const res= mockResponse();

            (changeDeviceDetails as jest.Mock).mockResolvedValue(devices[0]);
            const result = await editDevice(req,res,next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Successfully Changed Device Details', data : devices[0] });
        });  
        it('should return 404 if device to update not found', async () => {
            const req= mockRequest({params: {id: 999}, body: {name: 'Updated Device A' }});
            const res= mockResponse();

            (changeDeviceDetails as jest.Mock).mockResolvedValue(null);
            try {
                await editDevice(req, res, next);
            } catch (err: any) {
              expect(err).toBeInstanceOf(createHttpError.HttpError);
              expect(err.status).toBe(404);
              expect(err.message).toBe('Device not found');
            }
        })
        it('should return error',async()=>{
            const res = mockResponse();
            const req = mockRequest({});

            (changeDeviceDetails as jest.Mock).mockRejectedValue(new Error('failed'))
            await editDevice(req,res,next)

            expect(next).toHaveBeenCalled()

        })
    });
    describe('deleteDevice', () => {
        it('should delete and return the deleted device', async () => {
            const req= mockRequest({params: {id: 1}});
            const res= mockResponse();
            
            (deleteDevice as jest.Mock).mockResolvedValue({ id: 1 });
            await removeDevice(req,res,next);

            expect(deleteDevice).toHaveBeenCalledWith({ id: 1 });
        }
        );
    it('should throw NotFound error when device is missing', async () => {
          const req= mockRequest({params: {id: 1}});
            const res= mockResponse();
        (deleteDevice as jest.Mock).mockResolvedValue(null);

        try {
          await removeDevice(req, res, next);
        } catch (err: any) {
          expect(err).toBeInstanceOf(createHttpError.HttpError);
          expect(err.status).toBe(404);
          expect(err.message).toBe('Device not found');
        }
  });

    });
});

