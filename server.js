const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.get("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  res.json(notes);
});
