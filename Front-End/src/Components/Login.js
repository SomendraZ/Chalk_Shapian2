import "../CSS/Login.css";
import Gif from "../Resources/Chalk_Shapian.gif";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth, db } from "../FireBase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
const google =
  "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const login = async (event) => {
    event.preventDefault();
    const email = values.email;
    const password = values.password;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-left",
        autoClose: 1000,
      });
      return;
    }
    // Check if any of the input fields are empty
    if (!email || !password) {
      toast.error("Please fill out all the fields before submitting.", {
        position: "top-left",
        autoClose: 1000,
      });
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        sessionStorage.setItem("LoggedIn", true);
        navigate("/discover");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          toast.error(
            "No user found with this email address. Please check your email and try again.",
            {
              position: "top-left",
              autoClose: 1000,
            }
          );
        } else if (err.code === "auth/wrong-password") {
          toast.error(
            "Incorrect password. Please check your password and try again.",
            {
              position: "top-left",
              autoClose: 1000,
            }
          );
        } else {
          console.log(err);
          toast.error("An error occurred. Please try again later.", {
            position: "top-left",
            autoClose: 1000,
          });
        }
      });
  };

  const provider = new GoogleAuthProvider();

  const popUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check if user already exists in database
      const userRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        // user already exists, navigate to "/discover"
        navigate("/discover");
        sessionStorage.setItem("LoggedIn", true);
      } else {
        // user does not exist, create new user and navigate to "/chalkname"
        const newUser = {
          displayName: user.displayName,
          email: user.email,
          chalkName: "",
        };
        await setDoc(userRef, newUser);
        navigate("/chalkname");
      }
    } catch (error) {
      toast.error("Authentication failed. Please try again.", {
        position: "top-left",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg">
        <div className="gif">
          <div id="gif">
            <img src={Gif} alt="" id="Gif" />
          </div>
          <div className="loginPage">
            <div className="loginToAccount">Login To Your Account</div>
            <div>
              <div className="emailLogin">EMAIL</div>
              <input
                id="emailLogin"
                placeholder="Email"
                type="email"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </div>
            <div>
              <div className="passwordLogin">PASSWORD</div>
              <input
                id="passwordLogin"
                placeholder="Password"
                type="password"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
              />
            </div>
            <div className="remember">
              <input type="checkbox" id="check" />
              &nbsp;Remember me
            </div>
            <div className="loginBtn" onClick={login}>
              Login
            </div>
            <div className="or">
              <div className="hLine" />
              OR
              <div className="hLine" />
            </div>
            <div className="google" onClick={popUp}>
              <img src={google} alt="" id="google" />
              Sign-in with Google
            </div>
            <div className="noAccount">
              <div className="dont">Don’t have an account?</div>
              <Link className="signUp" to="/signup">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
