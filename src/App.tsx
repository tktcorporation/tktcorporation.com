import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Technologies from "./pages/Technologies";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/technologies" element={<Technologies />} />
    </Routes>
  );
}

export default App;
