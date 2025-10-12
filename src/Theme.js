import { createTheme } from "@mui/material/styles";
import "@fontsource/varela-round"; // Defaults to weight 400
import { responsiveFontSizes } from "@mui/material/styles";

const font = "'Varela Round', 'Segoe UI', 'Roboto', 'Mono sans', sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: `'Segoe UI', 'Roboto', 'Mono sans', sans-serif`,
    // Set a smaller base font size for the entire app
    fontSize: 12, // default is 14 → this affects rem scaling

    h1: { fontSize: "2.5rem" },
    h2: { fontSize: "2rem" },
    h3: { fontSize: "1.75rem" },
    h4: { fontSize: "1.5rem" },
    h5: { fontSize: "1.25rem" },
    h6: { fontSize: "1rem" },
    body1: { fontSize: "0.9rem" }, // default 1rem
    body2: { fontSize: "0.8rem" }, // default 0.875rem
    caption: { fontSize: "0.7rem" }, // smaller captions
    button: { fontSize: "0.8rem", textTransform: "none" },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0, // removes default left/right padding
          margin: 0, // removes any margin
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
