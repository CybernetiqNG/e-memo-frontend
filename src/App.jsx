import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
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

function Layout() {
  // auth();
  const location = useLocation();

  return (
    <div className="App">
      {![
        "/sign-in",
        "/forgot-password",
        "/verify-password",
        "/reset-password",
      ].includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
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
