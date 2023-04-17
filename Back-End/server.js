require("dotenv").config();
const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credential = require("./apiKey.json");

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));

admin.initializeApp({
  credential: admin.credential.cert(credential),
});

const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});

// POST route for saving data in Firestore from ImagePost
app.post("/image", async (req, res) => {
  try {
    const { uid, email, type, title, toolsUsed, artist, description, filters } =
      req.body;

    const post = {
      user: uid,
      email: email,
      type: type,
      title: title,
      tools_used: toolsUsed,
      artist: artist,
      description: description,
      filters: filters,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    console.log(post);

    const docRef = await db.collection("posts").add(post);
    res.setHeader("Content-Type", "application/json");
    res.status(201).json({
      message: `Image post with ID ${docRef.id} created successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// POST route for saving data in Firestore from VideoPost
app.post("/video", async (req, res) => {
  try {
    const { uid, email, type, title, videoLink, toolsUsed, artist, description, filters } =
      req.body;

    const post = {
      user: uid,
      email: email,
      type: type,
      title: title,
      videoLink: videoLink,
      tools_used: toolsUsed,
      artist: artist,
      description: description,
      filters: filters,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    console.log(post);

    const docRef = await db.collection("posts").add(post);
    res.setHeader("Content-Type", "application/json");
    res.status(201).json({
      message: `Video post with ID ${docRef.id} created successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});