import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

import "./index.css";
import "./App.css";
import "./assets/styles/animations.css";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
  return (
    <div className="flex flex-col bg-secondaryColor h-screen gap-2">
      <div className="h-[10vh] w-full">
        <Navbar />
      </div>
      <div className="h-full w-screen p-2">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
