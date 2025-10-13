const express = require("express");
const app = express();
const path = require("path");

// EJS template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // note ../ because api/ is one level deep

// static files from public/
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.get("/", (req, res) => {
  res.render("layout", { 
    title: "Samvel's Portfolio", 
    body: "pages/index", 
    page: "home" 
  });
});

app.get("/projects", (req, res) => {
  res.render("layout", { 
    title: "My Projects", 
    body: "pages/projects", 
    page: "projects" 
  });
});

module.exports = app;
