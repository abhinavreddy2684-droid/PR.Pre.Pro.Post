export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const fadeIn = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      duration: 0.8,
    },
  },
};

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.8,
    },
  },
};

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 80,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.8,
    },
  },
};