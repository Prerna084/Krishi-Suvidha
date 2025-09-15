import { get } from "./api";

/**
 * Get vermicompost guide, benefits, economics, plus organic pesticide recipes and drone guidelines.
 * @returns {Promise<{
 *  process: Array<{step:number,title:string,description:string,duration?:string,materials?:string[],tips?:string,maintenance?:string,yield?:string}>,
 *  benefits: string[],
 *  economicValue: { productionCost:string, marketPrice:string, profitMargin:string },
 *  organicPesticides?: Array<any>,
 *  droneSprayGuidelines?: { recommendedDilutions:string[], conditions:string[], safety:string[] }
 * }>}
 */
export async function getVermicompostGuide() {
  return get("vermicompost");
}
