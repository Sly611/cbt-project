import { Outlet } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import theme from "../Theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import store from "../store";
import { persistor } from "../store";

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="xl" disableGutters>
            <Outlet />
          </Container>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Root;
