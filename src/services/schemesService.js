import { get } from "./api";

/**
 * Fetch Government Schemes (Central + State) with optional filters.
 * params:
 *  - state: string (default "Punjab")
 *  - category: string (optional; e.g., "mechanization", "insurance", "renewable-energy")
 *  - q: string (optional search)
 *  - page: number (default 1)
 *  - pageSize: number (default 20)
 *
 * Returns:
 * {
 *   state: string,
 *   category: string|null,
 *   q: string|null,
 *   page: number,
 *   pageSize: number,
 *   totals: { central: number, state: number },
 *   centralSchemes: Array<Scheme>,
 *   stateSchemes: Array<Scheme>,
 *   notes: string
 * }
 */
export async function getGovernmentSchemes({
  state = "Punjab",
  category,
  q,
  page = 1,
  pageSize = 20,
} = {}) {
  const params = {
    params: {
      state,
      ...(category ? { category } : {}),
      ...(q ? { q } : {}),
      page,
      pageSize,
    },
  };
  return await get("/government-schemes", params);
}

export default {
  getGovernmentSchemes,
};
