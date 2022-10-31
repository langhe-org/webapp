import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A8E00'
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        sx: {
          fontWeight: 500
        }
      }
    }
  },
  typography: {
    fontFamily: "Poppins"
  }
});

export default theme;
