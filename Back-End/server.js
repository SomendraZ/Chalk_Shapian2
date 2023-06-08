const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credential = require("./firebase-adminsdk.json");

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));

admin.initializeApp({
  credential: admin.credential.cert(credential),
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const imageRoutes = require("./routes/imageRoutes");
const videoRoutes = require("./routes/videoRoutes");
app.use("/image", imageRoutes);
app.use("/video", videoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => { 
  console.log(`Listening to PORT ${PORT}`);
});
