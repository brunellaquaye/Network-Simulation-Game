import prisma from '../config/db';
import { Device, Scenario } from '../utils/types';

/**
 * Get all scenarios created by a specific user (Admin)
 */
export async function getAllUserScenarios({
  userId,
  includeDevices,
}: {
  userId: number;
  includeDevices?: boolean;
}): Promise<Scenario[]> {
  return await prisma.scenario.findMany({
    where: { userId },
    include: includeDevices ? { devices: true } : undefined,
  });
}

/**
 * Get all scenarios (for players to choose from)
 */
export async function getAllScenarios(): Promise<Scenario[]> {
  return await prisma.scenario.findMany({
    include: { user: { select: { username: true, role: true } } }, 
  });
}

/**
 * Get one scenario (optionally include blueprint devices)
 */
export async function getSpecificScenario({
  id,
  includeDevices,
}: {
  id: number;
  includeDevices?: boolean;
}): Promise<(Scenario & { devices?: Device[] }) | null> {
  return await prisma.scenario.findUnique({
    where: { id },
    include: includeDevices ? { devices: true } : undefined,
  });
}

/**
 * Create a new scenario (Admins only)
 */
export async function addNewScenario({
  userId,
  name,
  difficulty,
  timeLimit,
}: Scenario): Promise<Scenario | null> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return null;

  return await prisma.scenario.create({
    data: { name, difficulty, timeLimit, userId },
  });
}

/**
 * Update a scenario’s info
 */
export async function changeScenarioDetails({
  id,
  name,
  difficulty,
  timeLimit,
}: Omit<Scenario, 'userId'>): Promise<Scenario | null> {
  const scenario = await prisma.scenario.findUnique({ where: { id } });
  if (!scenario) return null;

  return await prisma.scenario.update({
    where: { id },
    data: { name, difficulty, timeLimit },
  });
}

/**
 * Delete a scenario and all its devices
 */
export async function deleteScenario({
  id,
}: {
  id: number;
}): Promise<Scenario | null> {
  const scenario = await prisma.scenario.findUnique({ where: { id } });
  if (!scenario) return null;

  return await prisma.scenario.delete({
    where: { id },
  });
}
