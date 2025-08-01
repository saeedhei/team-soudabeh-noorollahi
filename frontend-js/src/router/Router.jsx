import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cards from "../pages/Cards";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards" element={<Cards />} />
    </Routes>
  );
}

export default Router;
