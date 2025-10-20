
jest.mock('../../config/db', () => {
  const scenarioFns = {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn()
  };
  const prismaObj = { scenario: scenarioFns };

  return {
    __esModule: true,
    default: prismaObj, 
    prisma: prismaObj, 
  };
});

import prisma from "../../config/db";
// import 