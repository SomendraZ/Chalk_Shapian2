const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

router.post("/", async (req, res) => {
  try {
    const { uid, email, type, title, toolsUsed, artist, description, filters, imgURL } =
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
      imgURL: imgURL,
    };

    const docRef = await db.collection("posts").add(post);
    res.setHeader("Content-Type", "application/json");
    res.status(201).json(1);
  } catch (error) {
    res.status(500).json(0);
  }
});

module.exports = router;
