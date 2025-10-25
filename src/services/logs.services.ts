import prisma from '../config/db';
import { Role } from '../generated/prisma';
import { Logs } from '../utils/types';

/**
 * Create a new log linked to a session (and optionally a device)
 */
export const createSessionLog = async (data: Logs): Promise<Logs> => {
  const result = await prisma.log.create({
    data: {
      sessionId: data.sessionId,
      deviceId: data.deviceId || null,
      eventType: data.eventType,
      message: data.message,
    },
  });
  return result;
};

/**
 * Get ALL logs (only admin and Superadmin can do this)
 */
export const exposeAllLogs = async (adminId: number): Promise<Logs[] | null> => {
  const user = await prisma.user.findUnique({ where: { id: adminId } });
  if (!user) return null;

  if (user.role === Role.superadmin) {
    return await prisma.log.findMany({
      include: { session: true },
      orderBy: { timestamp: 'desc' },
    });
  }

  if (user.role === Role.admin) {
    return await prisma.log.findMany({
      where: {
        session: {
          scenario: {
            userId: adminId,
          },
        },
      },
      include: { session: true },
      orderBy: { timestamp: 'desc' },
    });
  }

  return null;
};

/**
 * Get logs for a specific scenario (all players)
 */
export const getScenarioLogs = async (scenarioId: number): Promise<Logs[] | null> => {
  const results = await prisma.log.findMany({
    where: {
      session: {
        scenarioId: scenarioId,
      },
    },
    include: { session: true },
    orderBy: { timestamp: 'desc' },
  });

  return results.length ? results : null;
};

/**
 * Get logs for a specific user's scenario session
 */
export const getUserScenarioSessionLogs = async (
  scenarioId: number,
  userId: number
): Promise<Logs[] | null> => {
  const results = await prisma.log.findMany({
    where: {
      session: {
        scenarioId,
        userId,
      },
    },
    include: { session: true },
    orderBy: { timestamp: 'desc' },
  });

  return results.length ? results : null;
};

/**
 * Clear ALL logs (Superadmin only)
 */
export const clearAllLogs = async (superId: number) => {
  const user = await prisma.user.findUnique({ where: { id: superId } });
  if (!user || user.role !== Role.superadmin) return null;

  const result = await prisma.log.deleteMany();
  return result;
};
