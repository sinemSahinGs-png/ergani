export const easeOutExpo: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export const duration = {
  fast: 0.2,
  standard: 0.5,
  editorial: 0.9,
  hero: 1.0,
} as const;

export const stagger = {
  fast: 0.06,
  standard: 0.08,
  slow: 0.1,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.standard, ease: easeOutExpo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.standard, ease: easeOutExpo },
  },
};

export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.editorial, ease: easeOutExpo },
  },
};

export const reducedFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.standard,
      delayChildren: 0.06,
    },
  },
};
