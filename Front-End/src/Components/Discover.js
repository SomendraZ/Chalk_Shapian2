import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChalkArt from "../Resources/Chalk_Art.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../CSS/discover.css";

const Discover = () => {
  const [StyleAll, setStyleAll] = useState("contAll");
  const [StyleImage, setStyleImage] = useState("contVideo");
  const [StyleVideo, setStyleVideo] = useState("contVideo");
  const changeStyleAll = () => {
    setStyleAll("contAll");
    setStyleImage("contVideo");
    setStyleVideo("contVideo");
  };
  const changeStyleImage = () => {
    setStyleAll("contVideo");
    setStyleImage("contAll");
    setStyleVideo("contVideo");
  };
  const changeStyleVideo = () => {
    setStyleAll("contVideo");
    setStyleImage("contVideo");
    setStyleVideo("contAll");
  };
  return (
    <>
      <Navbar/>
      <div className="discover">
        <div className="discoverBar">
          <select name="filter" className="custom-select" id="filter">
            <option value="newestPost">Newest Posts</option>
            <option value="mostLiked">Most Liked</option>
            <option value="simpleDesign">Simple Design</option>
            <option value="creativeDesign">Creative Design</option>
            <option value="faces">Faces</option>
            <option value="architectures">Architectures</option>
            <option value="weapons">Weapons</option>
            <option value="others">Others</option>
            <option value="shapianSpecial">Shapian's Special</option>
          </select>
          <div className="searchBar">
            <input id="searchBox" type="search" placeholder="   Search..." />
            <button id="searchBtn">
              <i className="fa fa-search" />
            </button>
          </div>
          <div className="lola">
            <div className={StyleAll} id="all" onClick={changeStyleAll}>
              All
            </div>
            <div className={StyleImage} id="images" onClick={changeStyleImage}>
              Images
            </div>
            <div className={StyleVideo} id="videos" onClick={changeStyleVideo}>
              Videos
            </div>
          </div>
        </div>
        <Link className="float" to="/post/image">
          <i className="fa fa-plus my-float"></i>
        </Link>
        <div className="content">
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          <div className="imgContent">
            <img src={ChalkArt} alt="" id="imgChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div>
          {/* <div className="vidContent">
            <img src={ChalkArt} alt="" id="vidChalk" />
            <div className="craftName">Man's Face</div>
            <div className="artistName">SomendraZ</div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Discover;
