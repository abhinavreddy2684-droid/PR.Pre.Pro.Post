export const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 50,
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