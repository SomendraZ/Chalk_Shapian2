import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../CSS/Discover.css";
import { getDocs, newestPost } from "../FireBase";

const Discover = () => {
  const [posts, setPosts] = useState([]);

  const [openmodal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTitle, setSelectetTitle] = useState(null);

  const imgpopup = (post) => {
    setOpenModal(!openmodal);
    setSelectedPost(post);
    setSelectetTitle(post.title);
  };

  useEffect(() => {
    getDocs(newestPost)
      .then((snapshot) => {
        let postsArr = [];
        snapshot.docs.forEach((doc) => {
          postsArr.push({ ...doc.data(), id: doc.id }); 
        });

        // Sort posts in descending order by timestamp
        postsArr.sort((a, b) => b.timestamp - a.timestamp);

        setPosts(postsArr);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
      <Navbar />
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
          {openmodal && selectedPost ? (
            <div id="myModal">
              <span className="close" onClick={() => setOpenModal(false)}>
                &times;
              </span>
              <div id="info">
                <img src={selectedPost.imgURL} alt="" id="imgModal" />
                <div className="titleModal">{selectedTitle}</div>
              </div>
            </div>
          ) : null}
          {posts.map((post) => {
            if (post.type === "image") {
              return (
                <div className="imgContent" key={post.id}>
                  <img
                    src={post.imgURL}
                    alt="chalk carving"
                    id="imgChalk"
                    onClick={() => imgpopup(post)}
                  />
                  <div className="craftName">{post.title}</div>
                  <div className="artistName">{post.artist}</div>
                </div>
              );
            } else if (post.type === "video") {
              return (
                <div className="vidContent" key={post.id}>
                  <img
                    src={post.imgCoverURL}
                    alt="chalk carving"
                    id="vidChalk"
                  />
                  <div className="craftName">{post.title}</div>
                  <div className="artistName">{post.artist}</div>
                </div>
              );
            } else {
              return null; // Post type not recognized
            }
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Discover;
