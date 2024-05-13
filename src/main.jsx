import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TokenProvider } from "./context/tokenContext.jsx";
import { MeProvider } from "./context/meContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { SettingsDropDownProvider } from "./context/settingsDropdownContext.jsx";
import { NotificationProvider } from "./context/notificationContext.jsx";
import { store } from "./store/store.js";
import {Provider} from 'react-redux';
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TokenProvider>
      <MeProvider>
        <SettingsDropDownProvider>
          <NotificationProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </NotificationProvider>
        </SettingsDropDownProvider>
      </MeProvider>
    </TokenProvider>
  </BrowserRouter>
);
