jest.mock('../../config/db', () => {
  const deviceFns = {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const prismaObj = { device: deviceFns };

  return {
    __esModule: true,
    default: prismaObj, 
    prisma: prismaObj, 
  };
});

const { prisma } = require('../../config/db');
const { getAllDevices, addNewDevice, changeDeviceDetails, deleteDevice } = require('../../services/device.services');

const devices = [
  {
    id: 1,
    name: 'Updated Device A',
    type: 'router',
    pingRate: null,
    latency: null,
    trafficLoad: null,
    status: 'online',
    lastUpdated: '2025-10-13T17:16:36.040Z',
    scenarioId: 1,
  },
  {
    id: 3,
    name: 'Device A',
    type: 'router',
    pingRate: null,
    latency: null,
    trafficLoad: null,
    status: 'online',
    lastUpdated: '2025-10-13T17:24:33.186Z',
    scenarioId: 1,
  },
  {
    id: 4,
    name: 'Updated Device A',
    type: 'router',
    pingRate: null,
    latency: null,
    trafficLoad: null,
    status: 'online',
    lastUpdated: '2025-10-13T17:59:25.590Z',
    scenarioId: 1,
  },
];

mockSample=devices[0];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Device Services', () => {
  describe('getAllDevices', () => {
    it('should return all devices', async () => {
      prisma.device.findMany.mockResolvedValue(devices);
      const result = await getAllDevices();
      expect(result).toBe(devices);
      expect(prisma.device.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no devices exist', async () => {
      prisma.device.findMany.mockResolvedValue([]);
      const result = await getAllDevices();
      expect(result).toEqual([]);
      expect(prisma.device.findMany).toHaveBeenCalled();
    });

  });

  describe('addNewDevice', () => {
    it('should create and return a new device and call prisma.create with correct data', async () => {
      const newDevice = { scenarioId: 1, name: 'Device A', type: 'router' };
      const created = { id: 4, ...newDevice };
      prisma.device.create.mockResolvedValue(created);

      const result = await addNewDevice(newDevice);
      expect(result).toEqual(created);

      // ensure prisma.create received the expected shape
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
      const newDevice = { scenarioId: 1, name: 'Device A', type: 'router' };
      prisma.device.create.mockRejectedValue(new Error('Create failed'));
      await expect(addNewDevice(newDevice)).rejects.toThrow('Create failed');
    });
  });

  describe('changeDeviceDetails', () => {
    it('should update and return the device details and call prisma.update with correct where/data', async () => {
      const payload = { id: 1, name: 'Updated Device A' };
      const updated = { id: 1, name: 'Updated Device A' };
      prisma.device.update.mockResolvedValue(updated);

      const result = await changeDeviceDetails(payload);
      expect(result).toEqual(updated);

      expect(prisma.device.update).toHaveBeenCalledTimes(1);
      expect(prisma.device.update).toHaveBeenCalledWith({
        where: { id: payload.id },
        data: { name: payload.name },
      });
    });
  });

  describe('deleteDevice', () => {
    it('should delete and return the deleted device and call prisma.delete with correct where', async () => {
      prisma.device.delete.mockResolvedValue(mockSample);

      const result = await deleteDevice({ id: 1 });
      expect(result).toEqual(mockSample);

      expect(prisma.device.delete).toHaveBeenCalledTimes(1);
      expect(prisma.device.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

  });
});