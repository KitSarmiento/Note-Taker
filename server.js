const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid"); // Import the entire UUID module

const app = express();
const PORT = process.env.PORT || 3000;

//  Middleware for parsing JSON and urlencoded form data. This is based on the class activity and use it as a reference to the assignment.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Generate a UUID for the notes
const generateUUID = () => {
  return uuid.v4(); // Use uuid.v4()
};

// Routes
// Get request
app.get("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  res.json(notes);
});

// Post request
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  newNote.id = generateUUID(); // Generate a new UUID for the note
  notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(newNote);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Bonus section
// Add the DELETE route to the application
app.delete("/api/notes/:id", (req, res) => {
  const idToDelete = req.params.id;
  let notes = JSON.parse(fs.readFileSync("./db/db.json"));
  notes = notes.filter((note) => note.id !== idToDelete);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.sendStatus(200);
});

// Listen for connections
app.listen(PORT, () => {
  console.log(`Express Server is listening at http://localhost:${PORT}`);
});
