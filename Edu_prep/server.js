const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "eduprep_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

/* Static Files */
app.use(express.static(path.join(__dirname, "public")));

/* Helper */
function isLoggedIn(req) {
  return req.session && req.session.user;
}

/* Home */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

/* Login */
app.post("/login", (req, res) => {
  const { email, apikey } = req.body;

  req.session.user = {
    email,
    apikey
  };

  res.redirect("/home.html");
});

/* Signup */
app.post("/signup", (req, res) => {
  const { email, apikey } = req.body;

  req.session.user = {
    email,
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

/* User */
app.get("/api/user", (req, res) => {
  res.json({
    loggedIn: isLoggedIn(req),
    user: isLoggedIn(req)
      ? req.session.user.email
      : null
  });
});

/* Tutor */
app.post("/api/tutor", (req, res) => {
  const { message } = req.body;

  if (!isLoggedIn(req)) {
    return res.json({
      reply: "Please login first."
    });
  }

  res.json({
    reply: "AI Tutor Answer: " + message
  });
});

/* Analytics */
app.get("/api/analytics", (req, res) => {
  res.json({
    studyMinutes: 142,
    promptScore: 89,
    accuracy: 93,
    topicsCompleted: 21
  });
});

/* 404 */
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

/* Start Server for Render */
app.listen(PORT, () => {
  console.log(`EduPrep running on port ${PORT}`);
});