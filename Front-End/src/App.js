import "./index.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Discover from "./Components/Discover";
import PostChalk from "./Components/PostChalk";
import Forum from "./Components/Forum";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/Discover" replace />} />
        <Route path="/Discover" element={<Discover />} />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/PostChalk/Image" element={<PostChalk />} />
        <Route path="/PostChalk/Videos" element={<PostChalk />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
