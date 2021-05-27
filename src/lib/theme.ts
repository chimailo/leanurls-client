import { createMuiTheme } from "@material-ui/core/styles"

// A custom theme for this app
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E40E43",
    },
    secondary: {
      main: "#364f6b",
    },
  },
  mixins: {
    toolbar: {
      minHeight: "54px",
    },
  },
  typography: {
    fontFamily: '"Raleway", "Helvetica", "Arial", sans-serif',
  },
})
