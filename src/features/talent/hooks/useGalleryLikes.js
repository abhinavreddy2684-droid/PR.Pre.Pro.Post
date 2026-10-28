import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginPathFor } from "@/features/auth";
import useAuth from "@/hooks/useAuth";
import { setItemLike } from "@/features/talent/api/publicGalleryApi";

/**
 * Like / Unlike for the public gallery. Public items carry `likes_count` but no flag saying
 * whether the viewer liked them, so the state is only known after the viewer acts: each answer
 * ({ liked, likes_count }) is kept here for the session and the button shows it from then on.
 * Before that, the first click likes (it is idempotent); an anonymous viewer goes to
 * /login?next=<this page> instead.
 */
export default function useGalleryLikes() {
  const { status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [known, setKnown] = useState({});
  const [pendingId, setPendingId] = useState(null);
  const [errors, setErrors] = useState({});

  const toggle = async (item) => {
    if (status === "signedOut") {
      navigate(loginPathFor(location));
      return;
    }
    if (status !== "signedIn" || pendingId === item.id) return;
    setPendingId(item.id);
    setErrors((current) => ({ ...current, [item.id]: null }));
    try {
      const wantLiked = !(known[item.id]?.liked ?? false);
      const answer = await setItemLike(item.id, wantLiked);
      setKnown((current) => ({
        ...current,
        [item.id]: { liked: answer.liked, count: answer.likes_count },
      }));
    } catch (error) {
      setErrors((current) => ({ ...current, [item.id]: error }));
    } finally {
      setPendingId(null);
    }
  };

  return {
    ready: status !== "loading",
    pendingId,
    errorFor: (id) => errors[id] ?? null,
    liked: (id) => known[id]?.liked ?? false,
    countFor: (item) => known[item.id]?.count ?? item.likesCount,
    toggle,
  };
}
