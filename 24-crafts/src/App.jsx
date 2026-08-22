import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import CraftPage from "./pages/CraftPage";
import Productions from "./pages/Productions";
import Artists from "./pages/Artists";
import TalentDiscovery from "./pages/TalentDiscovery";
import TalentProfile from "./pages/TalentProfile";

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
          path="/talent"
          element={<TalentDiscovery />}
        />

        <Route
          path="/talent/:talentId"
          element={<TalentProfile />}
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
