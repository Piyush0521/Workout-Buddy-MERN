import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { WorkoutsContextProvider } from "./context/WorkoutsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </WorkoutsContextProvider>
  </React.StrictMode>
);
