import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProloguePage from "@/components/Prologue/ProloguePage";
import MainPage from "@/pages/MainPage";
import MainPageDebug from "@/pages/MainPageDebug";
import FeverCaseDetail from "@/components/Main/FeverCaseDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProloguePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main-debug" element={<MainPageDebug />} />
        <Route path="/fever-case-detail" element={<FeverCaseDetail />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}
