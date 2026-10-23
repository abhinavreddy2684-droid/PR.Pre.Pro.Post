import { BrowserRouter } from "react-router-dom";

import AppRoutes from "@/app/routes";
import RouteScrollManager from "@/app/RouteScrollManager";

export default function App() {
  return (
    <BrowserRouter>
      <RouteScrollManager />
      <AppRoutes />
    </BrowserRouter>
  );
}
