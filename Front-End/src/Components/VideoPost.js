import React, { useState } from "react";
import "../CSS/VideoPost.css";
import { auth } from "../FireBase";
let plus =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png";

const VideoPost = () => {
  const [title, setVideoTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [toolsUsed, setVideoToolsUsed] = useState("");
  const [artist, setVideoArtist] = useState("");
  const [description, setVideoDescription] = useState("");
  const [filters, setVideoFilters] = useState([]);
  const type = "video";

  const postVideo = async (e) => {
    const user = auth.currentUser;
    const uid = user.uid;
    const email = user.email;
    if (user) {
      e.preventDefault();

      try {
        const response = await fetch("/video", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            email,
            type,
            title,
            videoLink,
            toolsUsed,
            artist,
            description,
            filters,
          }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setVideoFilters((prevFilters) => [...prevFilters, value]);
    } else {
      setVideoFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };
  return (
    <>
      <div className="video">
        <div className="videoDetails">
          <div className="videoImage">
            <img src={plus} alt="" id="videoImage" />
            Add Video Cover Link
          </div>
          <div className="videoRight">
            <div className="videoTitle">Post Title :</div>
            <input
              id="videoTitle"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
            <div className="videoLink">Video Link :</div>
            <input
              id="videoLink"
              placeholder="Video Link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            <div className="videoToolsUsed">Tools Used :</div>
            <input
              id="videoToolsUsed"
              placeholder="Tools Used"
              value={toolsUsed}
              onChange={(e) => setVideoToolsUsed(e.target.value)}
            />
            <div className="videoArtist">Artist Name :</div>
            <input
              id="videoArtist"
              placeholder="Artist Name"
              value={artist}
              onChange={(e) => setVideoArtist(e.target.value)}
            />
          </div>
        </div>
        <div id="filters">Filters :</div>
        <div className="filters">
          <label className="container">
            <input
              type="checkbox"
              className="checkbox"
              value="Simple Design"
              onChange={handleFilterChange}
            />
            Simple Design
          </label>
          <label className="container">
            <input
              type="checkbox"
              className="checkbox"
              value="Creative Design"
              onChange={handleFilterChange}
            />
            Creative Design
          </label>
          <label className="container">
            <input
              type="checkbox"
              className="checkbox"
              value="Faces"
              onChange={handleFilterChange}
            />
            Faces
          </label>
          <label className="container">
            <input
              type="checkbox"
              className="checkbox"
              value="Architectures"
              onChange={handleFilterChange}
            />
            Architectures
          </label>
          <label className="container">
            <input
              type="checkbox"
              className="checkbox"
              value="Weapons"
              onChange={handleFilterChange}
            />
            Weapons
          </label>
          <label className="container">
            <input
              type="checkbox"
              className="checkbox"
              value="Others"
              onChange={handleFilterChange}
            />
            Others
          </label>
        </div>
        <div className="description">
          <div className="videoDescription">Description :</div>
          <textarea
            id="videoDescription"
            placeholder="Description"
            value={description}
            onChange={(e) => setVideoDescription(e.target.value)}
          />
        </div>
        <div className="post" onClick={postVideo}>
          POST
        </div>
      </div>
    </>
  );
};

export default VideoPost;
