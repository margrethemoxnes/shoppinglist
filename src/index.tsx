import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import App from "./App.tsx";

document.documentElement.lang = "no";
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
);