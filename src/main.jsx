import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TokenProvider } from "./context/tokenContext.jsx";
import { MeProvider } from "./context/meContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { SettingsDropDownProvider } from "./context/settingsDropdownContext.jsx";
import { NotificationProvider } from "./context/notificationContext.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TokenProvider>
      <MeProvider>
        <SettingsDropDownProvider>
          <NotificationProvider>
            <Provider store={store}>
              <NextUIProvider>
                <App />
              </NextUIProvider>
            </Provider>
          </NotificationProvider>
        </SettingsDropDownProvider>
      </MeProvider>
    </TokenProvider>
  </BrowserRouter>,
);
