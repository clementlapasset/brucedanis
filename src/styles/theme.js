const theme = {
  colors: {},
  breakpoint: {
    xs: "375px",
    sm: "768px",
    md: "1024px",
    lg: "1280px",
    xl: "1440px",
    xxl: "1728px",
  },
  minWidth: {
    xs: `(min-width: 375px)`,
    sm: `(min-width: 768px)`,
    md: `(min-width: 1024px)`,
    lg: `(min-width: 1280px)`,
    xl: `(min-width: 1440px)`,
    xxl: `(min-width: 1728px)`,
  },
  cubicBezier: {
    pageTranstion: "cubic-bezier(.65,.05,.36,1)",
    base: "cubic-bezier(.25, .8, .25, 1)",
    bounce: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  },
  pageTransitionTime: 1,
  pageAppearanceTime: 1,
  columnGap: "15px",
  border: "1px solid #332728",
  aspectRatio: {
    mobile: 1.25,
    desktop: 1.8,
  },
};

export default theme;
