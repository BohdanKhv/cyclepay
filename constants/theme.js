import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    main: "#fff",
    secondary: "#F5F8FA",
    tertiary: "#E1E8ED",
    primary: "#FC642D",

    textLight: "#fff",
    textSecondary: "#f6f7f8",
    textDark: "#14171A",
    success: "#55f16c",
    danger: "#ff5e59",

    gray10: "#E5E5E5",
    gray20: "#CCCCCC",
    gray30: "#A1A1A1",
    gray40: "#999999",
    gray50: "#7F7F7F",
    gray60: "#666666",
    gray70: "#4C4C4C",
    gray80: "#333333",
    gray85: "#242526",
    gray90: "#191919",

    border: "#657786",

    gradientMain1: "#2D3239",
    gradientMain2: "#1B1E22",
    gradientMain3: "#14171A",

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
    top: 48,

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
    titleLg: 36,
    title: 32,
    titleSm: 30,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,

    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,
    body6: 10,

    // app dimensions
    width,
    height
};

export const FONTS = {
    title: { fontFamily: "Roboto-Black", fontSize: SIZES.title },
    titleLg: { fontFamily: "Roboto-Black", fontSize: SIZES.titleLg },
    titleSm: { fontFamily: "Roboto-Black", fontSize: SIZES.titleSm },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36, fontWeight: "bold" },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30, fontWeight: "bold" },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22, fontWeight: "bold" },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 20, fontWeight: "bold" },
    h5: { fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight: 16, fontWeight: "bold" },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 20 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 16 },
    body6: { fontFamily: "Roboto-Regular", fontSize: SIZES.body6, lineHeight: 16 },
};

export const darkTheme = {
    name: "dark",
    main: "#000",
    secondary: "#0D1117",
    tertiary: "#E1E8ED",
    primary: "#FC642D",
    textLight: "#000",
    textDark: "#14171A",
}

export const lightTheme = {
    name: "light",
    main: "#fff",
    secondary: "#F5F8FA",
    tertiary: "#E1E8ED",
    primary: "#FC642D",
    textLight: "#fff",
    textDark: "#14171A",
}

export const selectedTheme = lightTheme;

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;