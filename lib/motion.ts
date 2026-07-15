export const easeOutExpo: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export const duration = {
  micro: 0.2,
  fast: 0.22,
  standard: 0.42,
  reveal: 0.78,
  editorial: 0.9,
  image: 1.05,
  hero: 0.88,
} as const;

export const stagger = {
  fast: 0.06,
  standard: 0.08,
  slow: 0.09,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.reveal, ease: easeOutExpo },
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
  hidden: { opacity: 0, scale: 0.96 },
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
