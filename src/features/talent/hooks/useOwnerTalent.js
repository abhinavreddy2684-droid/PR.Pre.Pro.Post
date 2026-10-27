import { useContext } from "react";
import { OwnerTalentContext } from "@/features/talent/hooks/ownerTalentContext";

/**
 * The signed-in owner's profile on /talent/me, for the settings panel.
 * @returns {{ talent: import("@/lib/types").PrivateTalent,
 *   replace: (talent: import("@/lib/types").PrivateTalent) => void,
 *   reload: () => Promise<void> }}
 */
export default function useOwnerTalent() {
  const value = useContext(OwnerTalentContext);
  if (!value) throw new Error("useOwnerTalent must be used inside the owner profile page.");
  return value;
}
