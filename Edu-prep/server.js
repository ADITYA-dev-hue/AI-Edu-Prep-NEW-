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
    secret: process.env.SESSION_SECRET || "eduprep_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

/* ---------------- Static Files ---------------- */

app.use(express.static(path.join(__dirname, "public")));

/* ---------------- Helper ---------------- */

function isLoggedIn(req) {
  return req.session && req.session.user;
}

/* ---------------- Routes ---------------- */

/* Root */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

/* Login Page Shortcut */
app.get("/login", (req, res) => {
  res.redirect("/");
});

/* Signup */
app.post("/signup", (req, res) => {
  const { email, password, apikey } = req.body;

  if (!email || !password || !apikey) {
    return res.send("All fields required.");
  }

  req.session.user = {
    email,
    apikey
  };

  res.redirect("/home.html");
});

/* Login */
app.post("/login", (req, res) => {
  const { email, password, apikey } = req.body;

  if (!email || !password || !apikey) {
    return res.send("All fields required.");
  }

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

/* Current User */
app.get("/api/user", (req, res) => {
  if (isLoggedIn(req)) {
    return res.json({
      loggedIn: true,
      email: req.session.user.email
    });
  }

  res.json({
    loggedIn: false
  });
});

/* ---------------- Tutor API ---------------- */

app.post("/api/tutor", async (req, res) => {
  const { message } = req.body;

  if (!isLoggedIn(req)) {
    return res.json({
      reply: "Please login first."
    });
  }

  if (!message || message.trim() === "") {
    return res.json({
      reply: "Enter a valid question."
    });
  }

  const blockedWords = [
    "dating",
    "adult",
    "movie",
    "song",
    "joke",
    "relationship"
  ];

  const msg = message.toLowerCase();

  const blocked = blockedWords.some(word =>
    msg.includes(word)
  );

  if (blocked) {
    return res.json({
      reply:
        "EduPrep Tutor supports academic learning only."
    });
  }

  /* Gemini Ready Placeholder */
  return res.json({
    reply:
      "AI Tutor Answer for: " +
      message +
      " (Gemini API can be connected here)"
  });
});

/* ---------------- Analytics ---------------- */

app.get("/api/analytics", (req, res) => {
  if (!isLoggedIn(req)) {
    return res.json({
      studyMinutes: 0,
      promptScore: 0,
      accuracy: 0,
      topicsCompleted: 0
    });
  }

  res.json({
    studyMinutes: 142,
    promptScore: 89,
    accuracy: 93,
    topicsCompleted: 21
  });
});

/* ---------------- 404 ---------------- */

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

/* ---------------- Export for Vercel ---------------- */

module.exports = app;

/* ---------------- Local Run ---------------- */

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `EduPrep running on http://localhost:${PORT}`
    );
  });
}
