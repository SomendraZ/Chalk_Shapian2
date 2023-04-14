import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../CSS/signup.css";
import Gif from "../Resources/Chalk_Shapian.gif";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../FireBase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const validateEmail = (email) => {
    // regex to check email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const signup = async (event) => {
    event.preventDefault();

    const chalkName = values.username;
    const name = values.name;
    const email = values.email;
    const password = values.password;
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

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        sessionStorage.setItem("LoggedIn", true);
        await updateProfile(userCredential.user, {
          displayName: name,
        });
        sessionStorage.setItem("chalkName", chalkName);
        navigate("/discover");

        const user = userCredential.user;
        const uid = user.uid;

        // Save the user's information to Firestore
        try {
          await setDoc(doc(db, "users", uid), {
            chalkName: chalkName,
            name: name,
            email: email,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          alert("This email address is already in use.");
        } else {
          console.error(errorMessage);
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
          <div className="SignUpPage">
            <div className="SignUpToAccount">Create Account</div>
            <form>
              <div>
                <div className="flexRow">
                  <div className="chalkNameSignUp">CHALK NAME</div>
                  <div className="red">*</div>
                </div>
                <input
                  id="chalkNameSignUp"
                  placeholder="User Name"
                  type="text"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <div className="flexRow">
                  <div className="nameSignUp">NAME</div>
                  <div className="red">*</div>
                </div>
                <input
                  id="nameSignUp"
                  placeholder="Name"
                  type="text"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
              </div>
              <div>
                <div className="flexRow">
                  <div className="emailSignUp">EMAIL</div>
                  <div className="red">*</div>
                </div>
                <input
                  id="emailSignUp"
                  placeholder="Email"
                  type="email"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <div className="flexRow">
                  <div className="passwordSignUp">PASSWORD</div>
                  <div className="red">*</div>
                </div>
                <input
                  id="passwordSignUp"
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
              <div>
                <div className="flexRow">
                  <div className="confirmPasswordSignUp">CONFIRM PASSWORD</div>
                  <div className="red">*</div>
                </div>
                <input
                  id="confirmPasswordSignUp"
                  placeholder="Confirm Password"
                  type="password"
                />
              </div>
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
              <Link className="login" to="/login">
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
