import React from 'react';
import '../CSS/VideoPost.css';
let plus = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png"

const VideoPost = () => {
  return (
    <>
      <div className="video">
        <div className="videoDetails">
          <div className="videoImage">
            <img
              src={plus}
              alt=""
              id="videoImage"
            />
            Add Video Cover Link
          </div>
          <div className="videoRight">
            <div className="videoTitle">Post Title :</div>
            <input id="videoTitle" placeholder="Post Title" />
            <div className="videoLink">Video Link :</div>
            <input id="videoLink" placeholder="Video Link" />
            <div className="videoToolsUsed">Tools Used :</div>
            <input id="videoToolsUsed" placeholder="Tools Used" />
            <div className="videoArtist">Artist Name :</div> 
            <input id="videoArtist" placeholder="Artist Name" />
          </div>
        </div>
        <div id="filters">Filters :</div>
        <div className="filters">
          <label className="container">
            <input type="checkbox" id="checkbox"/>
            Simple Design
          </label>
          <label className="container">
            <input type="checkbox" id="checkbox"/>
            Creative Design
          </label>
          <label className="container">
            <input type="checkbox" id="checkbox"/>
            Faces
          </label>
          <label className="container">
            <input type="checkbox" id="checkbox"/>
            Architectures
          </label>
          <label className="container">
            <input type="checkbox" id="checkbox"/>
            Weapons
          </label>
          <label className="container">
            <input type="checkbox" id="checkbox"/>
            Others
          </label>
        </div>
        <div className="description">
          <div className="videoDescription">Description :</div>
          <textarea id="videoDescription" placeholder="Description" />
        </div>
        <div className="post">POST</div>
      </div>
    </>
  )
}

export default VideoPost
