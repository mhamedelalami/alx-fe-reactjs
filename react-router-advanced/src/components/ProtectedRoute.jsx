import { Navigate } from "react-router-dom";

// ✅ Fake authentication hook
function useAuth() {
  // Change this to false to simulate being logged out
  const isAuthenticated = true;
  return { isAuthenticated };
}

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect unauthenticated users to home page
    return <Navigate to="/" replace />;
  }

  return children;
}
