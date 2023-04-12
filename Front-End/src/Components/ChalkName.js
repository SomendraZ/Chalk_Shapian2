import React, { useState } from "react";
import "../CSS/ChalkName.css";
import { useNavigate } from "react-router-dom";

const arrow =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Red_Arrow_Right.svg/1024px-Red_Arrow_Right.svg.png";

const ChalkName = () => {
  const navigate = useNavigate();
  const [chalkName, setChalkName] = useState("");

  const doneSignIn = () => {
    if (chalkName === "") {
      alert("Please enter a Chalk Name.");
      return;
    } else if (!/^[a-zA-Z0-9 ]*$/.test(chalkName)) {
      alert("Chalk Name can only contain alphabets, numbers, and spaces.");
      sessionStorage.setItem("chalkName", chalkName);
      sessionStorage.setItem("LoggedIn", true);
      navigate("/Discover");
    }
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setChalkName(newValue);
  };

  return (
    <>
      <div className="bgcolor">
        <h1>Enter Chalk Name : </h1>
        <input
          id="chalkName"
          placeholder="User Name"
          type="text"
          value={chalkName}
          onChange={handleChange}
        />
        <div className="arrow" onClick={doneSignIn}>
          <img src={arrow} alt="" id="arrow" />
        </div>
      </div>
    </>
  );
};

export default ChalkName;
