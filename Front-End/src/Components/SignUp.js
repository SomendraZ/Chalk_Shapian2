import { Link, useNavigate } from "react-router-dom";
import React from "react";

import "../CSS/SignUp.css";
import Gif from "../Resources/Chalk_Shapian.gif";

const SignUp = () => {
  const navigate = useNavigate();
  const signup = async (event) => {
    event.preventDefault();

    const chalkName = document.getElementById("chalkNameSignUp").value;
    const name = document.getElementById("nameSignUp").value;
    const email = document.getElementById("emailSignUp").value;
    const password = document.getElementById("passwordSignUp").value;
    const confirmPassword = document.getElementById(
      "confirmPasswordSignUp"
    ).value;

    // Check if any of the input fields are empty
    if (!chalkName || !name || !email || !password || !confirmPassword) {
      alert("Please fill out all the fields before submitting.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character"
      );
      return;
    }

    navigate("/Discover");
  };
  return (
    <>
      <div className="bg">
        <div className="gif">
          <div id="gif">
            <img src={Gif} alt="" id="Gif" />
          </div>
          <div className="SignUpPage">
            <div className="SignUpToAccount">Create Account</div>
            <form>
              <div className="flexRow">
                <div className="chalkNameSignUp">CHALK NAME</div>
                <div className="red">*</div>
              </div>
              <input id="chalkNameSignUp" placeholder="User Name" type="text" />
              <div className="flexRow">
                <div className="nameSignUp">NAME</div>
                <div className="red">*</div>
              </div>
              <input id="nameSignUp" placeholder="Name" type="text" />
              <div className="flexRow">
                <div className="emailSignUp">EMAIL</div>
                <div className="red">*</div>
              </div>
              <input id="emailSignUp" placeholder="Email" type="email" />
              <div className="flexRow">
                <div className="passwordSignUp">PASSWORD</div>
                <div className="red">*</div>
              </div>
              <input
                id="passwordSignUp"
                placeholder="Password"
                type="password"
              />
              <div className="flexRow">
                <div className="confirmPasswordSignUp">CONFIRM PASSWORD</div>
                <div className="red">*</div>
              </div>
              <input
                id="confirmPasswordSignUp"
                placeholder="Confirm Password"
                type="password"
              />
              <button className="SignUpBtn" onClick={signup} type="submit">
                SignUp
              </button>
            </form>
            <div className="or">
              <div className="hLine" />
              OR
              <div className="hLine" />
            </div>
            <div className="alreadyAccount">
              <div className="already">Already have a account ?</div>
              <Link className="login" to="/Login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
