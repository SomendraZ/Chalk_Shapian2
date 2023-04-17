import { useState } from "react";
import "../CSS/ImagePost.css";
import { auth } from "../FireBase";
let plus =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png";

const ImagePost = () => {
  const [title, setImageTitle] = useState("");
  const [toolsUsed, setImageToolsUsed] = useState("");
  const [artist, setImageArtist] = useState("");
  const [description, setImageDescription] = useState("");
  const [filters, setImageFilters] = useState([]);
  const type = "image";

  const postImage = async (e) => {
    const user = auth.currentUser;
    const uid = user.uid;
    const email = user.email;
    if (user) {
      e.preventDefault();

      try {
        const response = await fetch("/image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            email,
            type,
            title,
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
      setImageFilters((prevFilters) => [...prevFilters, value]);
    } else {
      setImageFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };

  return (
    <>
      <div className="image">
        <div className="imageDetails">
          <div className="imageImage">
            <img src={plus} alt="" id="imageImage" />
            Add Image
          </div>
          <div className="imageRight">
            <div className="imageTitle">Post Title :</div>
            <input
              id="imageTitle"
              placeholder="Image Title"
              value={title}
              onChange={(e) => setImageTitle(e.target.value)}
            />
            <div className="imageToolsUsed">Tools Used :</div>
            <input
              id="imageToolsUsed"
              placeholder="Tools Used"
              value={toolsUsed}
              onChange={(e) => setImageToolsUsed(e.target.value)}
            />
            <div className="imageArtist">Artist Name :</div>
            <input
              id="imageArtist"
              placeholder="Artist Name"
              value={artist}
              onChange={(e) => setImageArtist(e.target.value)}
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
          <div className="imageDescription">Description :</div>
          <textarea
            id="imageDescription"
            placeholder="Description"
            value={description}
            onChange={(e) => setImageDescription(e.target.value)}
          />
        </div>
        <div className="post" onClick={postImage}>
          POST
        </div>
      </div>
    </>
  );
};

export default ImagePost;
