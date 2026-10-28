import { RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { userMessage } from "@/lib/api";

/** Full-page error shown when the reference data could not be loaded at startup. */
export default function CatalogUnavailable({ error, onRetry }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#040404] px-6 text-center text-white">
      <div className="max-w-md">
        <p className="text-[10px] uppercase tracking-[0.35em] text-amber-300">Pre Pro Post</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight">We can&apos;t load the app</h1>
        <p className="mt-4 text-sm leading-6 text-white/60" role="alert">
          {userMessage(error)}
        </p>
        <Button onClick={onRetry} className="mt-8 inline-flex items-center gap-2">
          <RefreshCw size={16} />
          Try again
        </Button>
      </div>
    </main>
  );
}
