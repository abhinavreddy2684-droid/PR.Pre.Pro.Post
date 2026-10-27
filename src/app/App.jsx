import { BrowserRouter } from "react-router-dom";

import AppRoutes from "@/app/routes";
import { AuthProvider } from "@/features/auth";
import RouteScrollManager from "@/app/RouteScrollManager";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteScrollManager />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
