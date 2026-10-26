/** Smooth-scrolls to the element with this id (no-op if it does not exist). */
export function scrollToId(id, behavior = "smooth") {
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

export function scrollToTop(behavior = "smooth") {
  window.scrollTo({ top: 0, left: 0, behavior });
}

/** Scrolls to the element a "#hash" points at, or to the top when the hash is empty. */
export function scrollToHash(hash) {
  if (hash) scrollToId(hash.slice(1));
  else scrollToTop();
}
