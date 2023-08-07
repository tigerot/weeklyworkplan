import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/tr";

dayjs.locale("tr");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
);