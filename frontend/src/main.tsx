import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./core/context/auth/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";
import { UIInteractionProvider } from "./core/context/interaction/InteractionProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UIInteractionProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={true}
            rtl={false}
            pauseOnHover
            theme="dark"
          />
        </UIInteractionProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
