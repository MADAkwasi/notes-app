import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import RecycleBinPage from "./pages/RecycleBin";
import DashboardLayout from "./core/layouts/Dashboard";
import NotePage from "./pages/Note";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/notes/:id" element={<NotePage />} />
        <Route path="/recycle-bin" element={<RecycleBinPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
