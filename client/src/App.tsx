import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { useSelector } from "react-redux";
import { RootState } from "./store/app-store";
import { FC } from "react";

const App = () => {
  const id = useSelector((state: RootState) => state.user.userData.id);

  interface RouteProps {
    children: React.ReactNode;
  }
  const PrivateRoute: FC<RouteProps> = ({ children }) => {
    return id ? children : <Navigate to="/auth" />;
  };
  const AuthRoute: FC<RouteProps> = ({ children }) => {
    return id ? <Navigate to="/chat" /> : children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
