import "../CSS/Login.css";
import Gif from "../Resources/Chalk_Shapian.gif";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../FireBase";
import { signInWithEmailAndPassword } from "firebase/auth";
const google =
  "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const login = async (event) => {
    event.preventDefault();
    const email = values.email;
    const password = values.password;
    // Check if any of the input fields are empty
    if (!email || !password) {
      alert("Please fill out all the fields before submitting.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        sessionStorage.setItem("LoggedIn", true);
        navigate("/Discover");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          alert(
            "No user found with this email address. Please check your email and try again."
          );
        } else if (err.code === "auth/wrong-password") {
          alert(
            "Incorrect password. Please check your password and try again."
          );
        } else {
          console.log(err);
          alert("An error occurred. Please try again later.");
        }
      });
  };
  return (
    <>
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
            <div className="google">
              <img src={google} alt="" id="google" />
              Sign-in with Google
            </div>
            <div className="noAccount">
              <div className="dont">Don’t have an account?</div>
              <Link className="signUp" to="/SignUp">
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
