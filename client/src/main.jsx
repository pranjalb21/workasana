import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { DataProvider } from "./contexts/Application.context";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <DataProvider>
                <App />
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Zoom}
                    bodyClassName="toastBody"
                />
            </DataProvider>
        </BrowserRouter>
    </StrictMode>
);
