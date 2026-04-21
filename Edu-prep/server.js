const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ---------------- Middleware ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "eduprep_secret_key",
    resave: false,
    saveUninitialized: true
  })
);

/* Serve Frontend Files */
app.use(express.static(path.join(__dirname, "public")));

/* ---------------- Routes ---------------- */

/* Default Route */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

/* Signup */
app.post("/signup", (req, res) => {
  const { email, password, apikey } = req.body;

  req.session.user = {
    email,
    password,
    apikey
  };

  res.redirect("/home.html");
});

/* Login */
app.post("/login", (req, res) => {
  const { email, password, apikey } = req.body;

  req.session.user = {
    email,
    password,
    apikey
  };

  res.redirect("/home.html");
});

/* Logout */
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

/* Check User */
app.get("/api/user", (req, res) => {
  if (req.session.user) {
    res.json({
      loggedIn: true,
      user: req.session.user.email
    });
  } else {
    res.json({
      loggedIn: false
    });
  }
});

/* AI Tutor API */
app.post("/api/tutor", async (req, res) => {
  const { message } = req.body;

  if (!req.session.user) {
    return res.json({
      reply: "Please login first."
    });
  }

  const blockedWords = [
    "joke",
    "dating",
    "movie",
    "song",
    "adult"
  ];

  const lowerMsg = message.toLowerCase();

  const blocked = blockedWords.some(word =>
    lowerMsg.includes(word)
  );

  if (blocked) {
    return res.json({
      reply:
        "EduPrep Tutor is for academic learning only."
    });
  }

  res.json({
    reply:
      "AI Tutor Response: " +
      message +
      " (Gemini API integration ready)"
  });
});

/* Analytics API */
app.get("/api/analytics", (req, res) => {
  res.json({
    studyMinutes: 124,
    promptScore: 88,
    accuracy: 91,
    topicsCompleted: 17
  });
});

/* ---------------- Start Server ---------------- */
app.listen(PORT, () => {
  console.log(`EduPrep running on http://localhost:${PORT}`);
});