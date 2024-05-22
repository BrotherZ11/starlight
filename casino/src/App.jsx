import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Ayuda from "./pages/Ayuda";
import Ruleta from "./pages/Ruleta";
import Slots from "./pages/Slots";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/ayuda" element={<Ayuda />}></Route>
        <Route path="/ruleta" element={<Ruleta />}></Route>
        <Route path="/slots" element={<Slots />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
