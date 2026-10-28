import { useContext } from "react";
import { CatalogContext } from "./catalogContext";

/**
 * Reference data from GET /api/bootstrap: crafts, states (each with cities), enums, and lookups
 * (craftBySlug, stateBySlug, stateById, cityById, enumOptions, enumLabel).
 * @returns {ReturnType<typeof import("./buildCatalog").buildCatalog>}
 */
export default function useCatalog() {
  const catalog = useContext(CatalogContext);
  if (!catalog) throw new Error("useCatalog must be used inside <BootstrapProvider>.");
  return catalog;
}
