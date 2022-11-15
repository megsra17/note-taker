const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const uniqid = require("uniqid");

const dbPath = path.join(__dirname, "..", "db", "db.json");

router.get("/notes", (req, res) => {
  fs.readFile(dbPath, "utf-8", function (err, data) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    const json = JSON.parse(data);
    res.json(json);
  });
});

router.post("/notes", (req, res) => {
  fs.readFile(dbPath, "utf-8", function (err, data) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    const notes = JSON.parse(data);

    //res.json(json);
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid(),
    };
    notes.push(newNote);

    fs.writeFile(dbPath, JSON.stringify(notes), function (err) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.status(200).json(notes);
    });
  });
});

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "We need an id" });
  }

  fs.readFile(dbPath, "utf8", function (err, data) {
    const note = JSON.parse(data);
    const updateNotes = note.filter((item) => item.id != req.params.id);
    fs.writeFile(dbPath, JSON.stringify(updateNotes), function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(true);
    });
  });
});
module.exports = router;
