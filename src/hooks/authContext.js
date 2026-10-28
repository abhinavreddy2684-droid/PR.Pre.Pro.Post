import { createContext } from "react";

// Provided by AuthProvider (features/auth). Lives here so shared components such as the Navbar
// can read the session without importing a feature.
export const AuthContext = createContext(null);
