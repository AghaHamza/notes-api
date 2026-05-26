const router = require("express").Router();
const {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
} = require("../controllers/notesController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getNotes);
router.post("/", authMiddleware, createNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;