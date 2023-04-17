require("dotenv").config();
const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credential = require("./apiKey.json");

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
    const { imageTitle, imageToolsUsed, imageArtist, imageDescription } =
      req.body;

    const newImagePost = {
      title: imageTitle,
      tools_used: imageToolsUsed,
      artist: imageArtist,
      description: imageDescription,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("image_posts").add(newImagePost);
    console.log(`Document written with ID: ${docRef.id}`);
    res.status(201).json({
      message: `Image post with ID ${docRef.id} created successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});
