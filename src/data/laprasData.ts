import { LaprasDataSchema, type LaprasData } from "./laprasSchema";
import laprasDataJson from "../../public/lapras-data.json";

/**
 * Get validated LAPRAS data
 * @throws {Error} If the data doesn't match the schema
 */
export function getLaprasData(): LaprasData {
  try {
    // Validate the JSON data against the schema
    const validatedData = LaprasDataSchema.parse(laprasDataJson);
    return validatedData;
  } catch (error) {
    console.error("Failed to validate LAPRAS data:", error);
    throw new Error("Invalid LAPRAS data format");
  }
}

/**
 * Get LAPRAS data safely (returns null on error)
 */
export function getLaprasDataSafe(): LaprasData | null {
  try {
    return getLaprasData();
  } catch (error) {
    console.error("Failed to load LAPRAS data:", error);
    return null;
  }
}