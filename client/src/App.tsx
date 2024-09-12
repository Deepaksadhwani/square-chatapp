import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/app-store";
import { FC, useEffect, useState } from "react";
import { apiClient } from "./lib/api-client";
import { setUserData } from "./store/slices/user-slice";

interface RouteProps {
  children: React.ReactNode;
}

// privateRoute component
const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const dataPresent = useSelector((state: RootState) => state.user.userData);
  return dataPresent ? children : <Navigate to="/auth" />;
};

//AuthRoute component
const AuthRoute: FC<RouteProps> = ({ children }) => {
  const dataPresent = useSelector((state: RootState) => state.user.userData);
  return dataPresent ? <Navigate to="/chat" /> : children;
};



//App component
const App = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get("/user/user-info", {
          withCredentials: true,
        });
        console.log(response)
        if (response.status === 200) {
          dispatch(setUserData(response.data.data));
        }
      } catch (error) {
        console.log({ error });
      }finally {
        setLoading(false)
      }
    };
    if (!userData) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userData, setUserData]);

  if (loading) {
    return <div>Loading....</div>;
  }
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
