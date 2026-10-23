export const reelSlide = {
  hidden: {
    opacity: 0,
    x: 120,
    scale: 0.92,
  },

  visible: {
    opacity: 1,
    x: 0,
    scale: 1,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const cinematicReveal = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
  },

  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",

    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};