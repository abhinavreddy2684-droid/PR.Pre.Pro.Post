import talents from "./talents";

/** The talent whose profile the owner views at /talent/me. */
/** @returns {import("@/lib/types").Talent} */
export const getOwnerTalent = () => talents[0];
