import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Ayuda from "./pages/Ayuda";
import Ruleta from "./pages/Ruleta";
import Slots from "./pages/Slots";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/ayuda" element={<Ayuda />} />
      <Route path="/ruleta" element={<Ruleta />} />
      <Route path="/slots" element={<Slots />} />
    </Routes>
  );
}

export default App;
