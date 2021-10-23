import { createTheme } from "@material-ui/core/styles";

// Add custom poperties - containers
const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontWeight: 800,
      // fontSize: "4.25rem"
    },
    h2: {
      fontWeight: 800
    },
    h3: {
      fontWeight: 700
    }
  },
  containers: {
    main: {
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: 8 * 2,
      paddingRight: 8 * 2,
      width: "100%",
      backgroundColor: "inherit",
      maxWidth: 1052
    },
    box: {
      marginTop: 16,
      marginBottom: 16,
      paddingTop: 8,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 3
    }
  },
  palette: {
    success: {
      main: "#00C008"
    },
    link: {
      main: "#2d64ff"
    },
    iceBlue: {
      main: "#E6F6FF"
    },
    // 'main's taken from previous fonts and logo
    // 'light' & 'dark' were calculated with material color picker
    // https://material.io/tools/color/#!/?primary.color=4C47F7&secondary.color=2fe9ff
    primary: {
      light: "#8b74ff",
      main: "#4C47F7",
      dark: "#001cc3"
    },
    secondary: {
      light: "#7bffff",
      main: "#2fe9ff",
      dark: "#00b6cc"
    }
  }
} as any) as any;

export const ThemeSpacing = (amount: number) => `${amount * 4}px`;

export default theme;