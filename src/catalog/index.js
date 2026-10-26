import crafts from "./crafts";
import indiaLocations from "./indiaLocations";

// Reference data shared by several features. This is the seam for GET /api/bootstrap.

/** All crafts: { id, title, description, talentTypes }. */
export const getCrafts = () => crafts;

export const getCraftTitles = () => crafts.map((craft) => craft.title);

/** State / union territory names. */
export const getStates = () => Object.keys(indiaLocations);

/** City names for a state; [] when the state is empty or unknown. */
export const getCities = (state) => (state ? (indiaLocations[state] ?? []) : []);
