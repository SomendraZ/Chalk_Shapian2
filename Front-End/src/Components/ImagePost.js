import React from "react";
import "../CSS/ImagePost.css";
let plus = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png"
const ImagePost = () => {
  return (
    
    <>
      <div className="image">
        <div className="imageDetails">
          <div className="imageImage">
            <img
              src={plus}
              alt=""
              id="imageImage"
            />
            Add Image Link
          </div>
          <div className="imageRight">
            <div className="imageTitle">Post Title :</div>
            <input id="imageTitle" placeholder="Image Title" />
            <div className="imageToolsUsed">Tools Used :</div>
            <input id="imageToolsUsed" placeholder="Tools Used" />
            <div className="imageArtist">Artist Name :</div>
            <input id="imageArtist" placeholder="Artist Name" />
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
          <div className="imageDescription">Description :</div>
          <textarea id="imageDescription" placeholder="Description" />
        </div>
        <div className="post">POST</div>
      </div>
    </>
  );
};

export default ImagePost;
