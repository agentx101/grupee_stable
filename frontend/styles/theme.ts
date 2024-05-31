import { extendTheme } from "@chakra-ui/react";

const defaultTheme = extendTheme({
  colors: {
    primary: {
      900: "#0129a2",
      800: "#1c3db6",
      700: "#2748c1",
      600: "#3252ce",
      500: "#385bd9",
      400: "#5A74E0",
      300: "#7A8FE6",
      200: "#A2AFED",
      100: "#C7CEF4",
      50: "#E9ECFB",
      0: "#F4F8FB",
    },
    red: {
      light: "#DF5954",
      dark: "#C53731"
    },
    green: {
      light: "#EFF8F2",
      dark: "#41BC5E"
    },
    neutral: {
      900: "#27292b",
      800: "#333638",
      700: "#494b4d",
      600: "#686a6d",
      500: "#7d7f81",
      400: "#c4c7c9",
      300: "#e6e9ec",
      200: "#eff2f5",
      100: "#f4f7fa",
      50: "#f9fcff",
      0: "#ffffff",
    },
  },
  fonts: {
    // app: "Urbanist, sans-serif",
    // landing: "Urbanist, sans-serif",
  },
  fontSizes: {
    12: "12px",
    14: "14px",
    16: "16px",
    18: "18px",
    24: "24px",
    28: "28px",
    32: "32px",
    40: "40px",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
  },
  textStyles: {
    app_reg_32: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "32px",
      fontWeight: 400,
      lineHeight: "150%",
    },
    app_bold_28: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "28px",
      fontWeight: 700,
      lineHeight: "150%",
    },
    app_reg_24: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: "150%",
    },
    app_med_18: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "150%",
    },
    app_med_16: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "150%",
    },
    app_semibold_14: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "150%",
    },
    app_semibold_16: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "150%",
    },
    app_semibold_18: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "150%",
    },
    app_reg_16: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "150%",
    },
    app_reg_18: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "150%",
    },
    app_reg_14: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "150%",
    },
    app_light_14: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "14px",
      fontWeight: 300,
      lineHeight: "150%",
    },
    app_med_10: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: "150%",
    },
    app_med_12: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "150%",
    },
    app_med_14: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "150%",
    },
    app_reg_12: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "150%",
    },
    app_light_12: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "12px",
      fontWeight: 300,
      lineHeight: "150%",
    },
    app_semibold_24: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "125%",
    },
    land_med_14: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "200%",
    },
    land_semibold_14: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "150%",
    },
    land_semibold_20: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "150%",
    },
    land_semibold_24: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "145%",
    },
    land_semibold_32: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "32px",
      fontWeight: 600,
      lineHeight: "150%",
    },
    land_semibold_36: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "36px",
      fontWeight: 600,
      lineHeight: "150%",
    },
    land_semibold_48: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "48px",
      fontWeight: 600,
      lineHeight: "135%",
    },
    land_semibold_62: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "62px",
      fontWeight: 600,
      lineHeight: "135%",
    },
    land_bold_32: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: "110%",
    },
    land_bold_48: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "48px",
      fontWeight: 700,
      lineHeight: "135%",
    },
    land_bold_62: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "62px",
      fontWeight: 700,
      lineHeight: "135%",
    },
    land_reg_56: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "56px",
      fontWeight: 400,
      lineHeight: "110%",
    },
    land_med_56: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "56px",
      fontWeight: 500,
      lineHeight: "110%",
    },
    land_reg_40: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "40px",
      fontWeight: 400,
      lineHeight: "200%",
    },
    land_reg_35: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "35px",
      fontWeight: 400,
      lineHeight: "110%",
    },
    land_med_16: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "150%",
    },
    land_semibold_16: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "150%",
    },
    land_med_35: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "35px",
      fontWeight: 500,
      lineHeight: "110%",
    },
    land_reg_32: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "32px",
      fontWeight: 400,
      lineHeight: "200%",
    },
    land_reg_24: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: "200%",
    },
    land_reg_24_150: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: "150%",
    },
    land_reg_20: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "200%",
    },
    land_reg_14: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "200%",
    },
    land_reg_16: {
      fontFamily: `Urbanist, sans-serif`,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "200%",
    }
  },
  lineHeights: {
    normal: "150%",
    bigger: "175%",
    big: "200%",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
});


export const ethereumTheme = extendTheme({
  colors: {
    primary: {
      900: "#545454",
      800: "#363636",
      700: "#363636",
      600: "#676767",
      500: "#161616",
      400: "#363636",
      300: "#D4D4D4",
      200: "#E5E5E5",
      100: "#F0F0F0",
      50: "#F8F8F8",
      0: "#ffffff"
    }
  }
}, defaultTheme);

export const polygonTheme = extendTheme({
  colors: {
    primary: {
      900: "#0000bd",
      800: "#3402cb",
      700: "#490cd1",
      600: "#8147E5",
      500: "#661ddf",
      400: "#8147E5",
      300: "#996aea",
      200: "#b797ef",
      100: "#d4c1f5",
      50: "#efe6fb",
      0: "#ffffff"
    }
  }
}, defaultTheme);


export default defaultTheme;
