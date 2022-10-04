import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    main: "#fff",
    secondary: "#f6f7f8",
    tertiary: "#f0f0f0",
    primary: "#f7a800",

    textLight: "#fff",
    textSecondary: "#f6f7f8",
    textDark: "#353535",
    success: "#55f16c",
    danger: "#ff5e59",
    
    border: "#f0f0f0",

    gradientMain1: "#464646",
    gradientMain2: "#393939",
    gradientMain3: "#212121",

    gradientPrimary1: "#ff5e23",
    gradientPrimary2: "#ff5e59",
    gradientPrimary3: "#ff5e59",
};

export const SIZES = {
    animationDuration: 150,
    animationDurationLong: 300,
    // Global sizes
    radius: 12,
    radiusSm: 6,
    padding: 16,

    s2: 2,
    s4: 4,
    s8: 8,
    s12: 12,
    s16: 16,
    s24: 24,
    s32: 32,
    s40: 40,
    s48: 48,

    // font sizes
    title: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    p1: 30,
    p2: 22,
    p3: 16,
    p4: 14,
    p5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.lTitle },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    h5: { fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;