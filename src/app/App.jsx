import { BrowserRouter } from "react-router-dom";

import AppRoutes from "@/app/routes";
import { BootstrapProvider } from "@/catalog";
import { AuthProvider } from "@/features/auth";
import RouteScrollManager from "@/app/RouteScrollManager";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BootstrapProvider>
          <RouteScrollManager />
          <AppRoutes />
        </BootstrapProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
