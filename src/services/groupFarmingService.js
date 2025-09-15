import { get, post } from "./api";

/**
 * Fetch Group Farming information for a given location.
 * Returns:
 * {
 *   nearbyGroups: Array<{ name, location, members, crops, landArea, coordinator, achievements }>,
 *   benefits: string[],
 *   governmentSupport: string[]
 * }
 */
export async function getGroupFarmingInfo(location) {
  const params = location ? { params: { location } } : {};
  return await get("/group-farming", params);
}

/**
 * Create a new Group Farming initiative.
 * payload: {
 *   groupName: string,
 *   location: string,
 *   cropType: string,
 *   landArea: string,
 *   coordinatorContact: string
 * }
 * Returns:
 * {
 *   groupId: number,
 *   message: string,
 *   benefits: string[],
 *   nextSteps: string[]
 * }
 */
export async function createGroupInitiative(payload) {
  return await post("/group-farming", payload);
}

export default {
  getGroupFarmingInfo,
  createGroupInitiative,
};
