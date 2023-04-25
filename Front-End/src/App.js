import "./index.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Discover from "./Components/Discover";
import PostChalk from "./Components/PostChalk";
import Forum from "./Components/Forum";
import ChalkName from "./Components/ChalkName";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "./FireBase";

const App = () => {
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const querySnapshot = await getDocs(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        if (querySnapshot.size > 0) {
          const chalkName = querySnapshot.docs[0].data().chalkName;
          sessionStorage.setItem("chalkName", chalkName);
          sessionStorage.setItem("LoggedIn", true); 
        } else {
          sessionStorage.setItem("chalkName", "Chalk Shapian");
          sessionStorage.setItem("LoggedIn", false);
        }
      } else {
        sessionStorage.setItem("chalkName", "Chalk Shapian");
        sessionStorage.setItem("LoggedIn", false);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/discover" replace />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post/image" element={<PostChalk />} />
        <Route path="/post/video" element={<PostChalk />} />
        <Route path="/chalkname" element={<ChalkName />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
