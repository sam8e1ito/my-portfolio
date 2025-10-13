import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// EJS template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files from public/
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("layout", { title: "Samvel`s Portfolio", body: "pages/index", page:"home"});
});
app.get("/projects", (req, res) => {
  res.render("layout", { title: "My Projects", body: "pages/projects", page: "projects"});
});

// start server locally
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
