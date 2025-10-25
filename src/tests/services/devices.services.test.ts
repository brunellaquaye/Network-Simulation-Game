
jest.mock('../../config/db', () => {
  const deviceFns = {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn()
  };
  const prismaObj = { device: deviceFns };

  return {
    __esModule: true,
    default: prismaObj, 
    prisma: prismaObj, 
  };
});

import  prisma  from '../../config/db';
import { devices } from '../mockData';
import { getAllDevices, addNewDevice, changeDeviceDetails, deleteDevice } from '../../services/device.services';




let mockSample = devices[0];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Device Services', () => {
  describe('getAllDevices', () => {
    it('should return all devices', async () => {
      (prisma.device.findMany as jest.Mock).mockResolvedValue(devices);
      const result = await getAllDevices();
      expect(result).toBe(devices);
      expect(prisma.device.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no devices exist', async () => {
      (prisma.device.findMany as jest.Mock).mockResolvedValue([]);
      const result = await getAllDevices();
      expect(result).toEqual([]);
      expect(prisma.device.findMany).toHaveBeenCalled();
    });

  });

  describe('addNewDevice', () => {
    it('should create and return a new device and call prisma.create with correct data', async () => {
      const newDevice = { scenarioId: 1, name: 'Device A', type: 'router', position: {
        x: 607.8460998535156,
        y: 446.0918846130371
      } };
      const created = { id: 4, ...newDevice };
      (prisma.device.create as jest.Mock).mockResolvedValue(created);

      const result = await addNewDevice(newDevice);
      expect(result).toEqual(created);

      expect(prisma.device.create).toHaveBeenCalledTimes(1);
      expect(prisma.device.create).toHaveBeenCalledWith({
        data: {
          scenarioId: newDevice.scenarioId,
          name: newDevice.name,
          type: newDevice.type,
        },
      });
    });

    it('should propagate errors from prisma.create', async () => {
            const newDevice = { scenarioId: 1, name: 'Device A', type: 'router', position: {
        x: 607.8460998535156,
        y: 446.0918846130371
      } };
      (prisma.device.create as jest.Mock).mockRejectedValue(new Error('Create failed'));
      await expect(addNewDevice(newDevice)).rejects.toThrow('Create failed');
    });
  });

  describe('changeDeviceDetails', () => {
    it('should update and return the device details and call prisma.update with correct where/data', async () => {
      const payload = { id: 1, name: 'Updated Device A', type: "router", scenarioId:1};
      const updated = { id: 1, name: 'Updated Device A', type: "router", scenarioId:1};
      (prisma.device.findFirst as jest.Mock).mockResolvedValue(payload);
      (prisma.device.update as jest.Mock).mockResolvedValue(updated);

      const result = await changeDeviceDetails(payload);
      expect(result).toEqual(updated);

      expect(prisma.device.update).toHaveBeenCalledTimes(1);
      expect(prisma.device.update).toHaveBeenCalledWith({
        where: { id: payload.id },
        data: { name: payload.name,type: payload.type},
      });
    });
  });

  describe('deleteDevice', () => {
    it('should delete and return the deleted device and call prisma.delete with correct where', async () => {
      (prisma.device.findFirst as jest.Mock).mockResolvedValue(mockSample);
      (prisma.device.delete as jest.Mock).mockResolvedValue(mockSample);

      const result = await deleteDevice({ id: 1 });
      expect(result).toEqual(mockSample);

      expect(prisma.device.delete).toHaveBeenCalledTimes(1);
      expect(prisma.device.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

  });
});