import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

function Layout() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/sign-in" && <Header />}

      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/message/:id" element={<Message />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/help" element={<Help />} />
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
