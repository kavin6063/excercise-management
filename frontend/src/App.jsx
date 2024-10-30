import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExerciseProgramPage from "./pages/ExerciseProgramPage";
import SavedProgramsPage from "./pages/SavedProgramsPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ExerciseProgramPage />} />
        <Route path="/saved-programs" element={<SavedProgramsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
