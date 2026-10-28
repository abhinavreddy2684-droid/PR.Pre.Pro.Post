import { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "@/components/ui/Loader";
import { api } from "@/lib/api";
import { CatalogContext } from "./catalogContext";
import CatalogUnavailable from "./CatalogUnavailable";
import { buildCatalog } from "./buildCatalog";

/**
 * Loads GET /api/bootstrap once at startup and provides it to the app (read it with
 * useCatalog). Revalidation with the ETag is left to the browser's HTTP cache.
 * Nothing renders until it has loaded, because crafts and locations are needed everywhere.
 */
export default function BootstrapProvider({ children }) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    api.get("/api/bootstrap", { auth: false }).then(
      (data) => active && setState({ status: "ready", data, error: null }),
      (error) => active && setState({ status: "error", data: null, error }),
    );
    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading", data: null, error: null });
    setAttempt((value) => value + 1);
  }, []);

  const catalog = useMemo(() => state.data && buildCatalog(state.data), [state.data]);

  if (state.status === "loading") return <Loader />;
  if (state.status === "error") return <CatalogUnavailable error={state.error} onRetry={retry} />;
  return <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>;
}
