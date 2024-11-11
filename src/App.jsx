import { useEffect, useState, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import SignIn from "./Screens/SignIn";
import Overview from "./Screens/Overview";
import Profile from "./Screens/Profile";
import Notification from "./Screens/Notification";
import Compose from "./Screens/Compose";
import Message from "./Screens/Messages/Message";
import Messages from "./Screens/Messages/Messages";
import Help from "./Screens/Help";
import auth from "./Utils/auth";
import Forgot from "./Screens/Forgot";
import Error from "./Screens/Error";
import Chat from "./Screens/Chat";
import Logout from "./Lib/LogOut";

function Layout() {
  // auth();
  const location = useLocation();

  const navigate = useNavigate();
  const [isInactive, setIsInactive] = useState(false);
  const logoutTime = 10 * 60 * 1000; // 2 minutes in milliseconds
  let logoutTimer;

  const isLoggedIn = !!localStorage.getItem("authToken");

  const logoutUser = useCallback(() => {
    setIsInactive(true);
    Logout();
    navigate("/sign-in"); // Redirect to SignIn page
  }, [navigate]);

  const resetTimer = useCallback(() => {
    setIsInactive(false);
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(logoutUser, logoutTime);
  }, [logoutUser, logoutTime]);

  // Set up event listeners to track user activity
  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    // Initialize the inactivity timer
    resetTimer();

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [resetTimer]);

  return (
    <div className="App">
      {![
        "/sign-in",
        "/forgot-password",
        "/verify-password",
        "/reset-password",
      ].includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/message/:id" element={<Message />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/help" element={<Help />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  );
}

export default App;
