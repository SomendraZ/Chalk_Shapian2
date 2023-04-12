import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chalk from "../Resources/chalk_shapian.PNG";
import Profile from "../Resources/profile.png";
import "../CSS/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  const [open, setOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("LoggedIn") === "true";

  useEffect(() => {
    const currentPathname = window.location.pathname;
    if (
      currentPathname === "/Discover" ||
      currentPathname === "/Forum" ||
      currentPathname === "/PostChalk/Image" ||
      currentPathname === "/PostChalk/Videos"
    ) {
      if (!isLoggedIn) navigate("/Login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  function logout() {
    localStorage.setItem("LoggedIn", "false");
    setOpen(false);
    navigate("/Login", { replace: true });
  }

  useEffect(() => {
    setActiveLink("Discover");
    const currentPathname = window.location.pathname;
    if (currentPathname === "/Discover") {
      setActiveLink("Discover");
    } else if (currentPathname === "/Forum") {
      setActiveLink("Forum");
    }
  }, [isLoggedIn]);
  
  function handleLinkClick(linkName) {
    if (linkName === "Forum") {
      navigate("/Forum");
    } else if (linkName === "Discover") {
      navigate("/Discover");
    }
  }

  function profileOpen() {
    setOpen(!open);
  } 

  return (
    <>
      <div className="navbar">
        <Link to="/Discover">
          <img id="chalk" src={Chalk} alt="" />
        </Link>
        <div className="bar">
          <div className="disfor">
            <Link
              id="discover"
              className={
                activeLink === "Discover" ? "contToggle" : "contNotToggle"
              }
              onClick={() => handleLinkClick("Discover")}
              to="/Discover"
              exact
            >
              Discover
            </Link>
              <Link
                id="forum"
                className={
                  activeLink === "Forum" ? "contToggle" : "contNotToggle"
                }
                onClick={() => handleLinkClick("Forum")}
                to="/Forum"
              >
                Forum
              </Link>
          </div>
          <div id="profile" onClick={profileOpen}>
              <>
                Hi,&nbsp;<u>Chalk Shapian</u>&nbsp;&nbsp;
                <img className="profile" src={Profile} alt="" />
              </>
          </div>
        </div>
      </div>
      {open ? (
        <div className="profileDrop">
          <div className="closeProfile" onClick={profileOpen}>
            X
          </div>
            <div className="pfl">
              <div className="yourPosts">Your Posts</div>
              <div className="yourLiked">Your Liked Posts</div>
              <div className="logout" onClick={logout}>
                Logout
              </div>
            </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
  