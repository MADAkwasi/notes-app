import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./core/context/auth/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";
import { UIInteractionProvider } from "./core/context/interaction/InteractionProvider.tsx";
import { NoteProvider } from "./core/context/note/NoteProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UIInteractionProvider>
          <NoteProvider>
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
          </NoteProvider>
        </UIInteractionProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
