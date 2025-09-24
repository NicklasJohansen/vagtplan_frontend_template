import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import { ToastProvider } from "./contexts/ToastContext";
import Layout from "./Layout";
import WardsPage from "./pages/1-overview/14-SubDepartmentsPage";

export default function App() {


  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <WardsPage />
            }
          />
          <Route
            path="/afsnit"
            element={
              <WardsPage />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
