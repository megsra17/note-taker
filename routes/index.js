const router = require("express").Router();
const htmlRoutes = require("./html.js");
const notesRoutes = require("./notes.js");

router.use("/api", notesRoutes);
router.use(htmlRoutes);

module.exports = router;
