import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import CraftPage from "./pages/CraftPage";
import Productions from "./pages/Productions";
import Artists from "./pages/Artists";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/crafts"
          element={<CraftPage />}
        />

        <Route
          path="/productions"
          element={<Productions />}
        />

        <Route
          path="/artists"
          element={<Artists />}
        />
      </Routes>
    </BrowserRouter>
  );
}