import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProloguePage from "@/components/Prologue/ProloguePage";
import MainPage from "@/pages/MainPage";
import MainPageDebug from "@/pages/MainPageDebug";
import ThemeDebug from "@/pages/ThemeDebug";
import FeverCaseDebug from "@/pages/FeverCaseDebug";
import FeverCaseDetail from "@/components/Main/FeverCaseDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProloguePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main-debug" element={<MainPageDebug />} />
        <Route path="/theme-debug" element={<ThemeDebug />} />
        <Route path="/fever-case-debug" element={<FeverCaseDebug />} />
        <Route path="/fever-case-detail" element={<FeverCaseDetail />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}
